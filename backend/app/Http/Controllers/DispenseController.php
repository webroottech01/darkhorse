<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Product;

class DispenseController extends Controller
{
    public function getData()
    {
        $baseUrl = config('services.dispense.base_url');
        $apiKey = config('services.dispense.api_key');
        $venueId = config('services.dispense.venue_id');

        $limit = 100;
        $skip = 0;
        $totalFetched = 0;

        do {
            $response = Http::withHeaders([
                'x-dispense-api-key' => $apiKey,
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ])->get("$baseUrl/products", [
                'venueId' => $venueId,
                'limit' => $limit,
                'skip' => $skip
            ]);

            Log::info("Dispense API page skip=$skip status: " . $response->status());

            if ($response->successful()) {
                $json = $response->json();
                $products = $json['data'] ?? [];
                $totalFetched += count($products);

                foreach ($products as $item) {
                    Product::firstOrCreate(
                        ['uuid' => $item['id'] ?? null],
                        [
                            'name' => $item['name'] ?? '',
                            'slug' => $item['slug'] ?? '',
                            'description' => $item['description'] ?? '',
                            'posProductId' => $item['posProductId'] ?? '',
                            'product_url' => $item['productUrl'] ?? '',
                            'productCategoryName' => $item['productCategoryName'] ?? '',
                            'image' => $item['image'] ?? '',
                            'meta_title' => '',
                            'meta_description' => '',
                            'focus_keywords' => '',
                            'tags' => '',
                        ]
                    );
                }

                $skip += $limit;
            } else {
                return response()->json([
                    'error' => 'Failed to fetch data at skip ' . $skip,
                    'status' => $response->status(),
                    'body' => $response->body()
                ], $response->status());
            }

        } while (!empty($products));

        return response()->json([
            'message' => "All products fetched & inserted successfully. Total inserted or checked: $totalFetched"
        ]);
    }

    public function showProducts()
{
    $products = Product::latest()->paginate(50);
    return view('products.index', compact('products'));
}
}

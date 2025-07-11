<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::latest()->paginate(50);
        return view('products.index', compact('products'));
    }

    public function create()
    {
        // (agar kabhi manual create form banana ho)
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Product $product)
    {
        //
    }

    public function edit(Product $product)
    {
        return view('products.edit', compact('product'));
    }

    public function update(Request $request, Product $product)
{
    $request->validate([
        'name' => 'required',
        'slug' => 'required',
        'description' => 'nullable',
        'productCategoryName' => 'nullable',
        'posProductId' => 'nullable',
        'image' => 'nullable|url',
        'meta_title' => 'nullable',
        'meta_description' => 'nullable',
        'focus_keywords' => 'nullable',
        'tags' => 'nullable',
        'schema' => 'nullable',
    ]);

    $product->update($request->all());

    return redirect()->route('products.index')
                     ->with('success', 'Product updated successfully.');
}


    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')
                         ->with('success', 'Product deleted successfully.');
    }

    public function apiProducts()

{
    // dd('kdkdskjdsjk');
    return response()->json([
        'success' => true,
        'data' => Product::latest()->paginate(50)
    ]);
}
}

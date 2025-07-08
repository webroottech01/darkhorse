@extends('layouts.app')

@section('content')
<div class="container">
    <h1 class="mb-4">Products</h1>

    <div class="table-responsive shadow-sm rounded">
        <table class="table table-hover align-middle mb-0">
            <thead class="table-dark">
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Slug</th>
                    <th scope="col">Category</th>
                    <th scope="col">POS ID</th>
                    <th scope="col">Description</th>
                    <th scope="col" class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($products as $product)
                    <tr>
                        <td class="text-center">
                            @if ($product->image)
                                <img src="{{ $product->image }}" alt="{{ $product->name }}"
                                     class="rounded"
                                     style="width: 60px; height: 60px; object-fit: cover;">
                            @else
                                <div style="width: 60px; height: 60px; background: #e9ecef;"
                                     class="d-inline-block rounded"></div>
                            @endif
                        </td>
                        <td>{{ $product->name }}</td>
                        <td>{{ $product->slug }}</td>
                        <td>{{ $product->productCategoryName }}</td>
                        <td>{{ $product->posProductId }}</td>
                        <td>{{ Str::limit($product->description, 50) }}</td>
                        <td class="text-center">
                            <a href="{{ $product->product_url }}" class="btn btn-sm btn-outline-primary" target="_blank">
                                <i class="bi bi-box-arrow-up-right"></i> View
                            </a>
                            <a href="{{ route('products.edit', $product->id) }}" class="btn btn-sm btn-outline-warning">
                                <i class="bi bi-pencil-square"></i> Edit
                            </a>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="7" class="text-center py-4">No products found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="d-flex justify-content-center mt-4">
        {{ $products->links() }}
    </div>
</div>
@endsection

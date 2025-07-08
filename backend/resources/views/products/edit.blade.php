@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Edit Product</h1>

        <form action="{{ route('products.update', $product->id) }}" method="POST">
            @csrf
            @method('PUT')

            <div class="mb-3">
                <label>Name</label>
                <input type="text" name="name" value="{{ old('name', $product->name) }}" class="form-control" required>
            </div>

            <div class="mb-3">
                <label>Slug</label>
                <input type="text" name="slug" value="{{ old('slug', $product->slug) }}" class="form-control" required>
            </div>

            <div class="mb-3">
                <label>Description</label>
                <textarea name="description" class="form-control">{{ old('description', $product->description) }}</textarea>
            </div>

            <div class="mb-3">
                <label>Category</label>
                <input type="text" name="productCategoryName"
                    value="{{ old('productCategoryName', $product->productCategoryName) }}" class="form-control">
            </div>

            <div class="mb-3">
                <label>POS ID</label>
                <input type="text" name="posProductId" value="{{ old('posProductId', $product->posProductId) }}"
                    class="form-control">
            </div>

            <div class="mb-3">
                <label>Image URL</label>
                <input type="text" name="image" value="{{ old('image', $product->image) }}" class="form-control">
            </div>

            <div class="mb-3">
                <label>Meta Title</label>
                <input type="text" name="meta_title" value="{{ old('meta_title', $product->meta_title) }}"
                    class="form-control">
            </div>

            <div class="mb-3">
                <label>Meta Description</label>
                <textarea name="meta_description" class="form-control">{{ old('meta_description', $product->meta_description) }}</textarea>
            </div>

            <div class="mb-3">
                <label>Focus Keywords</label>
                <input type="text" name="focus_keywords" value="{{ old('focus_keywords', $product->focus_keywords) }}"
                    class="form-control">
            </div>

            <div class="mb-3">
                <label>Tags</label>
                <input type="text" name="tags" value="{{ old('tags', $product->tags) }}" class="form-control">
            </div>

            <div class="mb-3">
                <label>Schema</label>
                <textarea name="schema" class="form-control" rows="5">{{ old('schema', $product->schema) }}</textarea>
            </div>
            <button type="submit" class="btn btn-success">Update Product</button>
        </form>
    </div>
@endsection

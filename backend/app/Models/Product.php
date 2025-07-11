<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'name',
        'slug',
        'description',
        'posProductId',
        'product_url',
        'productCategoryName',
        'image',
        'meta_title',
        'meta_description',
        'focus_keywords',
        'tags',
        'schema',
    ];
}

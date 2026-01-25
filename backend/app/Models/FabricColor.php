<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Str;
class FabricColor extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'fabric_colors';

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'name',
        'hex_code',
        'is_active',
        'created_at',
        'updated_at',
        'deleted_at',
    ];
}

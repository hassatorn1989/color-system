<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Str;
class Color extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'color';
    protected $fillable = [
        'id',
        'group_color_id',
        'priority',
        'color',
        'is_active',
        'created_by',
        'updated_by',
        'created_at',
        'updated_at',
        'deleted_at',
    ];
}

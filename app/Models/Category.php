<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['category_title'])]
class Category extends Model
{
    /**
     * @return BelongsToMany<Movie, $this>
     */
    public function movies(): BelongsToMany
    {
        return $this->belongsToMany(
            Movie::class,
        )->withTimestamps();
    }
}

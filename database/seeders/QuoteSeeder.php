<?php

namespace Database\Seeders;

use App\Models\Movie;
use App\Models\Quote;
use App\Models\User;
use Illuminate\Database\Seeder;

class QuoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $movie = Movie::query()->first();
        $userIds = User::query()->pluck('id');

        if ($movie === null || $userIds->isEmpty()) {
            return;
        }

        $coverPath = Quote::query()->first()?->getFirstMediaPath('quote_cover');

        $quotes = [
            ['en' => "I'll be back.", 'ka' => 'დავბრუნდები.'],
            ['en' => 'May the Force be with you.', 'ka' => 'ძალა შენთან იყოს.'],
            ['en' => "Here's looking at you, kid.", 'ka' => 'გიყურებ, ბიჭო.'],
            ['en' => 'You talking to me?', 'ka' => 'მე მელაპარაკები?'],
            ['en' => 'I am your father.', 'ka' => 'მე შენი მამა ვარ.'],
            ['en' => 'Life is like a box of chocolates.', 'ka' => 'ცხოვრება შოკოლადის კოლოფს ჰგავს.'],
            ['en' => 'Why so serious?', 'ka' => 'რატომ ხარ ასე სერიოზული?'],
            ['en' => 'To infinity and beyond!', 'ka' => 'უსასრულობამდე და უფრო შორს!'],
            ['en' => 'Keep your friends close.', 'ka' => 'მეგობრები ახლოს დაიჭირე.'],
            ['en' => 'I see dead people.', 'ka' => 'მკვდრებს ვხედავ.'],
            ['en' => 'Houston, we have a problem.', 'ka' => 'ჰიუსტონ, პრობლემა გვაქვს.'],
            ['en' => "I'll make him an offer he can't refuse.", 'ka' => 'ისეთ წინადადებას შევთავაზებ, რომელზეც უარს ვერ იტყვის.'],
            ['en' => "There's no place like home.", 'ka' => 'სახლივით ადგილი არ არსებობს.'],
            ['en' => 'Just keep swimming.', 'ka' => 'უბრალოდ განაგრძე ცურვა.'],
            ['en' => 'I feel the need for speed.', 'ka' => 'სიჩქარის საჭიროებას ვგრძნობ.'],
            ['en' => 'Tomorrow is another day.', 'ka' => 'ხვალ სხვა დღე იქნება.'],
            ['en' => 'Say hello to my little friend.', 'ka' => 'ჩემს პატარა მეგობარს მიესალმე.'],
            ['en' => "You can't handle the truth!", 'ka' => 'სიმართლეს ვერ აიტან!'],
            ['en' => 'Not every man really lives.', 'ka' => 'ყველა ნამდვილად არ ცხოვრობს.'],
            ['en' => 'With great power comes great responsibility.', 'ka' => 'დიდ ძალას დიდი პასუხისმგებლობა მოჰყვება.'],
            ['en' => 'I drink your milkshake!', 'ka' => 'შენს მილქშეიკს ვსვამ!'],
            ['en' => 'Get to the chopper!', 'ka' => 'ვერტმფრენთან მიდი!'],
            ['en' => "I'm the king of the world!", 'ka' => 'მე ვარ მსოფლიოს მეფე!'],
            ['en' => "They'll never take our freedom!", 'ka' => 'თავისუფლებას არასდროს წაგვართმევენ!'],
            ['en' => 'Elementary, my dear Watson.', 'ka' => 'ელემენტარულია, ჩემო ძვირფასო ვატსონ.'],
            ['en' => 'Bond. James Bond.', 'ka' => 'ბონდი. ჯეიმს ბონდი.'],
            ['en' => "I'm walking here!", 'ka' => 'აქ მივდივარ!'],
            ['en' => 'Nobody puts Baby in a corner.', 'ka' => 'ბეიბის კუთხეში არავინ სვამს.'],
            ['en' => 'This is Sparta!', 'ka' => 'ეს სპარტაა!'],
            ['en' => 'I volunteer as tribute!', 'ka' => 'მე ვთავაზობ თავს!'],
        ];

        foreach ($quotes as $index => $text) {
            $quote = Quote::query()->create([
                'quote' => $text,
                'movie_id' => $movie->id,
                'user_id' => $userIds[$index % $userIds->count()],
            ]);

            $quote->created_at = now()->subMinutes(30 - $index);
            $quote->save();

            if (is_string($coverPath) && $coverPath !== '') {
                $quote->addMedia($coverPath)
                    ->preservingOriginal()
                    ->toMediaCollection('quote_cover');
            }
        }
    }
}

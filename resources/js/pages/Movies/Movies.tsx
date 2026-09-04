import { PlusSquare } from 'lucide-react';
import { useState } from 'react';

import MainLayout from '@/components/MainLayout/MainLayout';

import { CreateMovieModal } from './components/MovieModal';

const Movies = () => {
    const [createOpen, setCreateOpen] = useState(false);

    return (
        <MainLayout>
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-medium text-white">
                    My list of movies
                </h2>
                <button
                    type="button"
                    onClick={() => setCreateOpen(true)}
                    className="actionBtn flex items-center gap-2 bg-brand py-2! hover:bg-brand/90"
                >
                    <PlusSquare className="size-5" strokeWidth={2} />
                    <span>Add movie</span>
                </button>
            </div>

            <CreateMovieModal open={createOpen} onOpenChange={setCreateOpen} />
        </MainLayout>
    );
};

export default Movies;

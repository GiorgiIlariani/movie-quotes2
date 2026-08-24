import type { MotionValue } from 'framer-motion';
import { motion, useTransform } from 'framer-motion';

type Props = {
    lines: string[];
    attribution: string;
    progress: MotionValue<number>;
    start: number;
    end: number;
};

export default function CurtainQuote({
    lines,
    attribution,
    progress,
    start,
    end,
}: Props) {
    const span = end - start;
    const y = useTransform(
        progress,
        [end - span * 2, end, end + span],
        ['100dvh', '0dvh', '-150dvh'],
    );

    return (
        <div
            className="absolute inset-x-0 bottom-0 flex items-center pl-[15%] text-white"
            style={{ height: 'var(--curtain-open)' }}
        >
            <motion.div style={{ y }} className="flex flex-col gap-6">
                <p className="text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl">
                    {lines.map((line) => (
                        <span key={line} className="block">
                            {line}
                        </span>
                    ))}
                </p>
                <p className="text-sm sm:text-base">{attribution}</p>
            </motion.div>
        </div>
    );
}

import type { MotionStyle, MotionValue } from 'framer-motion';
import { motion, useTransform } from 'framer-motion';
import CurtainQuote from './CurtainQuote';

type Props = {
    src: string;
    alt: string;
    progress: MotionValue<number>;
    start: number;
    end: number;
    lines: string[];
    attribution: string;
};

export default function CurtainPanel({
    src,
    alt,
    progress,
    start,
    end,
    lines,
    attribution,
}: Props) {
    const open = useTransform(progress, [start, end], ['0%', '100%']);

    return (
        <motion.section
            className="curtain-mask relative col-start-1 row-start-1 size-full"
            style={{ '--curtain-open': open } as MotionStyle}
        >
            <img src={src} alt={alt} className="size-full object-cover" />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/80 to-transparent to-50%"
            />
            <CurtainQuote
                lines={lines}
                attribution={attribution}
                progress={progress}
                start={start}
                end={end}
            />
        </motion.section>
    );
}

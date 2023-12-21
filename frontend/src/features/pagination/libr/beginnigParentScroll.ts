export const beginnigParentScroll = (ref: React.RefObject<HTMLElement>) => {
    const parent = ref.current?.parentElement;
    if (parent) {
        const allHeight = window.scrollY || document.documentElement.scrollTop;//|| 0;
        const parentHeight = parent.getBoundingClientRect().height;
        window.scrollTo({ top: parentHeight - allHeight, behavior: 'smooth' });
    }
}
export const beginnigParentScroll = (ref: React.RefObject<HTMLElement>) => {
    const parent = ref.current?.parentElement;
    if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const parentOffsetTop = parentRect.top + window.scrollY - 50;
        window.scrollTo({ top: parentOffsetTop, behavior: 'smooth' });
    }
}

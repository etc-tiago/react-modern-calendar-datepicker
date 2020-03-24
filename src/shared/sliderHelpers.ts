import { getDateAccordingToMonth } from './generalUtils';

const getSlideDate = (args: any) => {
  const { parent, isInitialActiveChild, activeDate, monthChangeDirection } = args;
  if (!parent) {
    return isInitialActiveChild ? activeDate : getDateAccordingToMonth(activeDate, 'NEXT');
  }
  const child = parent.children[isInitialActiveChild ? 0 : 1];
  const isActiveSlide = child.classList.contains('-shown') || child.classList.contains('-shownAnimated'); // check -shownAnimated for Safari bug
  return isActiveSlide ? activeDate : getDateAccordingToMonth(activeDate, monthChangeDirection);
};

const animateContent = (args: any) => {
  const { parent, direction } = args;
  const wrapperChildren = Array.from(parent.children);
  const shownItem: any = wrapperChildren.find((child: any) => child.classList.contains('-shown'));
  const hiddenItem: any = wrapperChildren.find((child: any) => child !== shownItem);
  const baseClass = shownItem.classList[0];
  const isNextMonth = direction === 'NEXT';
  const getAnimationClass = (value: any) => (value ? '-hiddenNext' : '-hiddenPrevious');
  hiddenItem.style.transition = 'none';
  shownItem.style.transition = '';
  shownItem.className = `${baseClass} ${getAnimationClass(!isNextMonth)}`;
  hiddenItem.className = `${baseClass} ${getAnimationClass(isNextMonth)}`;
  hiddenItem.classList.add('-shownAnimated');
};

const handleSlideAnimationEnd = (args: any) => {
  const { target } = args;
  target.classList.remove('-hiddenNext');
  target.classList.remove('-hiddenPrevious');
  target.classList.replace('-shownAnimated', '-shown');
};

export { animateContent, getSlideDate, handleSlideAnimationEnd };

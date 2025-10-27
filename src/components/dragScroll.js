export function enableDrag(slider) {
  if (!slider) return;
  let isDown = false, startX, scrollLeft;

  slider.addEventListener('mousedown', e => {
    isDown = true;
    slider.classList.add('dragging');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    e.preventDefault(); // جلوگیری از انتخاب متن و رفتار پیش‌فرض
  });

  slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('dragging'); });
  slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('dragging'); });

  slider.addEventListener('mousemove', e => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    slider.scrollLeft = scrollLeft - (x - startX) * 2;
  });

  slider.addEventListener('touchstart', e => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('touchend', () => { isDown = false; });
  slider.addEventListener('touchmove', e => {
    if(!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    slider.scrollLeft = scrollLeft - (x - startX) * 2;
  });
}

function spoilerAdd(){
      function spoilerUpFlex(target) {
            target.parentElement.classList.remove('_spoilerOpen');
            target.style.height = '0px';
      }
      function spoilerDownFlex(target) {
            target.parentElement.classList.add('_spoilerOpen')
            let height = target.scrollHeight;
            target.style.height = `${height}px`;
      }
      function spoilerToggle(element) {
            if (!element.parentElement.classList.contains('_spoilerOpen')) {
                  spoilerDownFlex(element);
            } else {
                  spoilerUpFlex(element);
            }
      }
      function spoilerClick() {
            event.preventDefault();
            if (this.parentElement.classList.contains('_spoilerActive')) {
                  spoilerToggle(this.nextElementSibling);
            }
      }
      function spoilerAdd(element) {
            if (!element.parentElement.classList.contains("_spoilerActive")) {
                  element.parentElement.classList.add("_spoilerActive")
                  element.nextElementSibling.style.cssText = `height:0px;overflow:hidden;transition:.2s;`
                  element.parentElement.classList.remove('_spoilerOpen');
                  element.style.cssText = `cursor:pointer;`
                  element.addEventListener('click', spoilerClick)
            }
      }
      function spoilerRemove(element) {
            element.parentElement.classList.remove('_spoilerOpen');
            element.nextElementSibling.style.cssText = ``
            element.style.cssText = ``
            element.parentElement.classList.remove("_spoilerActive");
            element.removeEventListener('click', spoilerClick)
      }
      return function () {
            const spoilers = document.querySelectorAll("[data-spoiler]");
            if (spoilers.length > 0) {
                  for (const spoiler of spoilers) {
                        if (spoiler.dataset.spoiler) {
                              if (window.innerWidth <= spoiler.dataset.spoiler) {
                                    spoilerAdd(spoiler)
                              } else {
                                    spoilerRemove(spoiler);
                              }
                        } else {
                              spoilerAdd(spoiler)
                        }
                  }
            }
      }
}

export const spoilerFlex = spoilerAdd();

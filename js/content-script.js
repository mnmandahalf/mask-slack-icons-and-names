const members = [
  "cat",
  "dog",
  "fox",
  "raccoon",
  "seal",
  "bambi",
  "bear",
  "lion",
  "panda",
  "elephant",
  "penguin",
  "wolf",
];

chrome.runtime.onMessage.addListener((message) => {
  const startTimeInMs = Date.now();
  const timeoutMs = 10000;
  const intervalMs = 1000;

  const mask = (list) => {
    const replaceNames = [...members];
    const mem = {};
    list.forEach((item) => {
      const nameContainer = item.querySelector('[data-testid="User-Name"]');
      const names = nameContainer.querySelectorAll('span');
      const nameElem = names[0];
      const idElem = names[3];
      let replaceName;
      const name = nameElem.textContent;
      if(mem[name] != null) {
        replaceName = mem[name];
      } else {
        replaceName = replaceNames.pop();
        mem[name] = replaceName;
      }
      nameElem.textContent = replaceName;
      idElem.textContent = `@${replaceName}`;
      const imgContainer = item.querySelector('[data-testid="Tweet-User-Avatar"]');
      const imgElem = imgContainer.querySelector('img');
      imgElem.src = chrome.runtime.getURL(`images/${replaceName}.svg`);
      imgElem.srcset = chrome.runtime.getURL(`images/${replaceName}.svg`);
      imgElem.style.opacity = "1";
    });
  }

  const blur = (list) => {
    const blurCSS = "-ms-filter: blur(4px); filter: blur(4px);"
    list.forEach((item) => {
      const names = item.querySelectorAll('[data-testid="User-Name"]');
      names.forEach((nameElem) => {
        nameElem.style.cssText = blurCSS;
      });

      const imgs = item.querySelectorAll('[data-testid="Tweet-User-Avatar"]');
      imgs.forEach((imgElem) => {
        imgElem.style.cssText = blurCSS;
      });
    });
  };

  const findLoop = (message) => {
      const list = document.querySelectorAll('[data-testid="tweet"]');
      if (list.length > 0) {
          message === "triggered" ? mask(list) : blur(list);
          return;
      } else {
          setTimeout(() => {
              if (timeoutMs && Date.now() - startTimeInMs > timeoutMs) return;
              findLoop();
          }, intervalMs);
      }
  }

  findLoop(message);
});

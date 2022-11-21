import { Plugin, loadMathJax, finishRenderMath, renderMath } from 'obsidian';


export default class MathJaxWikiLinks extends Plugin {

	async onload() {

        await loadMathJax();

        this.registerMarkdownPostProcessor((element, context) => {

            element.querySelectorAll('.internal-link').forEach((link) => {
				let linkText = link.textContent.trim();

				if (linkText.contains("$")) {
					
					let isMath = false;
					let sections = linkText.split("$");

					link.innerText = '';
					for (let i = 0; i < sections.length; i++) {
						let text = sections[i];

						if (text != "") {
							if (isMath) {
								let mathLink = link.createSpan();
								mathLink.replaceWith(renderMath(text, false));
							} else {
								let wordLink = link.createSpan();
								wordLink.innerText += text;
							}
						}

						isMath = !isMath;
					}

					finishRenderMath();
                }
            })
        });
	}
}


import { highlight, languages } from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import './assets/style.css';

const form = document.forms[0];
const mapInput = document.querySelector<HTMLTextAreaElement>('#mapJSON')!;
const jsOutput = document.querySelector('#code')!;
const copyBtn = document.querySelector('#copy')!;

async function convert(source: string) {
  const response = await fetch('/api/convert', {
    method: 'POST',
    body: source,
  });

  const output = await response.text();
  if (!response.ok) throw new Error(output);
  return output;
}

function getScriptSource(): string {
  try {
    return JSON.parse(mapInput.value).scripts.client;
  } catch (error) {
    return mapInput.value;
  }
}

form.addEventListener('submit', async event => {
  event.preventDefault();

  try {
    const source = getScriptSource();
    const output = await convert(source);

    jsOutput.innerHTML = highlight(output, languages.javascript, 'javascript');
  } catch (error: any) {
    console.error(error);
    mapInput.setCustomValidity(error.toString());
    mapInput.reportValidity();
  }
});

mapInput.addEventListener('input', () => {
  mapInput.setCustomValidity('');
});

copyBtn.addEventListener('click', () => {
  const output = jsOutput.textContent;
  if (output) navigator.clipboard.writeText(output);
});

import { helper as buildHelper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export function backgroundImage([imageUrl]) {
  return htmlSafe(`background-image: url(${imageUrl});`);
}

export default buildHelper(backgroundImage);

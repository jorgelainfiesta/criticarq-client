import { helper as buildHelper } from '@ember/component/helper';
import { get } from '@ember/object';

export function inHome([postTags]) {
  return postTags.any((tag) => {
    return parseInt(get(tag, 'id')) === 6;
  });
}

export default buildHelper(inHome);

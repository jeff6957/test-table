

export const fillRef = <T>(ref: React.Ref<T>, node: T) => {
  if (typeof ref === 'function') {
    ref(node);
  } else if (typeof ref === 'object' && ref && 'current' in ref) {
    (ref as any).current = node;
  }
};

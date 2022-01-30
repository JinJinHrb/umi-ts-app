// sessionStorage Start

export const getSelectedIndex = (pathname: string, defaultValue: number) => {
  const key = `SelectedIndex_${pathname}`;
  let val = sessionStorage.getItem(key) || String(defaultValue);
  if (!/^\d+$/.test(val)) {
    val = String(defaultValue);
    sessionStorage.setItem(key, val);
  }
  return parseInt(val);
};

export const setSelectedIndex = (pathname: string, val: number) => {
  const key = `SelectedIndex_${pathname}`;
  sessionStorage.setItem(key, String(val));
};

// sessionStorage End

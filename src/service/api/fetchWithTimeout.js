const fetchWithTimeout = async (resource, options) => {
  const {timeout} = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 30000);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);

  return response;
};

export default fetchWithTimeout;

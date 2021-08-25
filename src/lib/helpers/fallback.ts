export function env(varName: string, fallback: any): any {
  return process.env[varName] || fallback;
}

export default {
  env,
};

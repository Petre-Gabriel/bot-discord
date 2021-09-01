export default function logError(...logs: any[]) {
  console.log('\x1b[31m', '[ERROR] ', ...logs);
}

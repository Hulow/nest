import ddTrace from 'dd-trace';

ddTrace.init({
  service: 'my-nest-app',
  env: 'development',
  version: '1.0.0',
  logInjection: true,
});

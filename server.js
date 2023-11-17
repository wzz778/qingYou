const spawn = require('cross-spawn');

const child = spawn('npm', ['run', 'start'], {
  windowsHide: true
});

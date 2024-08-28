const core = require('@actions/core')
const exec = require('@actions/exec')

async function run() {
    try {
        const username = core.getInput('username')
        const email = core.getInput('email')
        const token = core.getInput('token')
    
         // Configure git
        await exec.exec('git', ['config', '--global', 'user.name', username]);
        await exec.exec('git', ['config', '--global', 'user.email', email]);
    
        // Add changes and commit
        await exec.exec('git', ['add', '.']);
        await exec.exec('git', ['commit', '-m', 'New bot commit']);
        await exec.exec('git', ['push', '-u', 'origin', 'main'], {
            env: { GITHUB_TOKEN: token }
        });
    }
    catch (err) {
        core.setFailed(`Action failed with error ${err}`);
    }
}

run()


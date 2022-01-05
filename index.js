const core = require('@actions/core');
const github = require('@actions/github');

try {
  if (!github.context.payload.pull_request) {
    core.setFailed("This action can only be used in a pull request.");
    return;
  }

  const branchToMergeFrom = github.context.payload.pull_request.head.ref;
  const branchToMergeInto = github.context.payload.pull_request.base.ref;
  const stagingName = core.getInput('stagingName') || 'staging';
  const mainName = core.getInput('mainName') || 'main';

  if (!branchToMergeFrom || !branchToMergeInto) {
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    core.setFailed(`Could not determine branch to merge from or into. Payload: ${payload}`);
  }
  if (branchToMergeInto !== mainName) {
    console.log('Valid: Not merging into main.');
    return;
  }
  if (branchToMergeFrom === stagingName) {
    console.log('Valid: Merging staging into main.');
    return;
  }
  core.setFailed(
    "Attempting to merge from \"" +
    branchToMergeFrom + "\" into \"" + branchToMergeInto +
    "\", which is the default branch. This is not allowed." +
    " Please merge into \"" + stagingName + "\" first, and then \"" +
    stagingName + "\" into \"" + mainName + "\"."
  );
} catch (error) {
  core.setFailed(error.message);
}
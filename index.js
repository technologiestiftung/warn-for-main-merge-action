const core = require('@actions/core');
const github = require('@actions/github');

try {
  const branchToMergeFrom = github.context.payload.head.ref;
  const branchToMergeInto = github.context.payload.base.ref;
  const stagingName = core.getInput('stagingName') || 'staging';
  const mainName = core.getInput('mainName') || 'main';

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
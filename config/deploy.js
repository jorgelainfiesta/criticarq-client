module.exports = function(deployTarget) {
  return {
    'gcloud': {
      bucket: 'criticarq-assets',
      key: 'fastboot-release.json'
    },
    'gcloud-storage': {
      projectId: 'carbon-scene-127723',
      bucket: 'criticarq-assets'
    }
  };
};

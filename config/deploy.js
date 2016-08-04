module.exports = function(deployTarget) {
  return {
    'gcloud': {
      bucket: 'criticarq-assets',
      key: 'fastboot-release.json'
    },
    'gcloud-storage': {
        bucket: 'criticarq-assets'
    }
  };
};

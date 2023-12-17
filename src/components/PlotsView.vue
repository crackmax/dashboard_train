<template>
  <div class="image-container">
    <div v-for="(image, index) in images" :key="index" class="image-item">
      <img :src="require(`@/assets/${image}`)" alt="Description de l'image" class="img-fluid" />
    </div>
  </div>
</template>
  
<script>
export default {
    name: 'PlotsView',

    data() {
      return {
        images: ['accuracyScore.jpg', 'distributionLoss.jpg', 'distributionReconstructionLoss.jpg', 'LossIterations.jpg', 'Matrix.jpg', 'precisionRecall.jpg', 'result.jpg']
        // Ajoutez ici le nom de vos fichiers d'image
      };
    }
  };
  </script>

<style scoped>
.image-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.image-item {
  width: calc(33.33% - 10px); /* 10px for margin compensation */
  margin-bottom: 20px;
}

.img-fluid {
  max-width: 100%; /* Ensure the image does not exceed its container width */
  height: auto; /* Maintain the aspect ratio of the image */
}
</style>
<script setup>
import {ref, onMounted, watch} from "vue";
import {useRoute} from "vue-router";
import Footer from "../components/footer.vue";
import navbar from "../components/navBar.vue";

// Simuler une base de données de produits, ou appelez une API ici
const allProducts = ref([
    {
        id: 1,
        name: "T-Shirt Beyboy",
        price: 45.0,
        oldPrice: 55.9,
        rating: 5,
        description: `
            This Beyboy T-Shirt is made of soft and durable organic cotton.
            Perfect for everyday use with an elegant and comfortable design.
        `,
        images: [
            new URL("../assets/image/t1.jpg", import.meta.url).href,
            new URL("../assets/image/t1-h.jpg", import.meta.url).href,
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
        id: 2,
        name: "Minimalist T-Shirt",
        price: 35.0,
        oldPrice: 45.0,
        rating: 4,
        description: `
            A minimalist T-shirt made of soft cotton, suitable for all occasions.
        `,
        images: [
            new URL("../assets/image/t2.jpg", import.meta.url).href,
            new URL("../assets/image/t.jpg", import.meta.url).href,
        ],
        sizes: ["S", "M", "L", "XL"],
    },
    {
        id: 3,
        name: "Classic T-Shirt",
        price: 75,
        oldPrice: 100,
        rating: 5,
        description: `
            A classic T-shirt made from soft, breathable fabric.
            Suitable for all seasons and perfect for everyday use.
        `,
        images: [
            new URL("../assets/image/t3.jpg", import.meta.url).href,
            new URL("../assets/image/t.jpg", import.meta.url).href,
        ],
        sizes: ["M", "L", "XL"],
    },
    {
        id: 4,
        name: "Versatile T-Shirt",
        price: 89,
        oldPrice: 99,
        rating: 4,
        description: `
            A versatile T-shirt combining style, comfort, and durability.
        `,
        images: [
            new URL("../assets/image/t4.jpg", import.meta.url).href,
            new URL("../assets/image/t4-h.jpg", import.meta.url).href,
        ],
        sizes: ["S", "M", "L", "XL"],
    },
    {
        id: 5,
        name: "Premium T-Shirt",
        price: 89,
        oldPrice: 99,
        rating: 4,
        description: `
            A premium design in cotton, ideal for casual occasions.
        `,
        images: [
            new URL("../assets/image/t5.jpg", import.meta.url).href,
            new URL("../assets/image/t5-h.jpg", import.meta.url).href,
        ],
        sizes: ["M", "L"],
    },
    {
        id: 6,
        name: "Modern T-Shirt",
        price: 89,
        oldPrice: 99,
        rating: 4,
        description: `
            Designed with eco-responsible fabric, perfect for a modern look.
        `,
        images: [
            new URL("../assets/image/t6.jpg", import.meta.url).href,
            new URL("../assets/image/t6-h.jpg", import.meta.url).href,
        ],
        sizes: ["M", "L", "XL", "XXL"],
    },
    {
        id: 7,
        name: "Classic T-Shirt",
        price: 89,
        oldPrice: 99,
        rating: 4,
        description: `
            A wardrobe essential, available in multiple sizes.
        `,
        images: [
            new URL("../assets/image/t7.jpg", import.meta.url).href,
            new URL("../assets/image/t7-h.jpg", import.meta.url).href,
        ],
        sizes: ["S", "L", "XL"],
    },
    {
        id: 8,
        name: "Retro T-Shirt",
        price: 89,
        oldPrice: 99,
        rating: 4,
        description: `
            Inspired by retro designs for a unique and casual look.
        `,
        images: [
            new URL("../assets/image/t8.jpg", import.meta.url).href,
            new URL("../assets/image/t8-h.jpg", import.meta.url).href,
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
        id: 9,
        name: "Streetwear T-Shirt",
        price: 89,
        oldPrice: 99,
        rating: 4,
        description: `
            Perfect for streetwear lovers with a simple modern design.
        `,
        images: [
            new URL("../assets/image/t9.jpg", import.meta.url).href,
            new URL("../assets/image/t9-h.jpg", import.meta.url).href,
        ],
        sizes: ["M", "L", "XL"],
    },
]);

// Variables réactives
const product = ref(null);
const route = useRoute(); // Accès à la route actuelle
const productId = ref(route.params.id ? parseInt(route.params.id) : null); // Récupérer l'ID
const mainImage = ref(null); // Reactive variable for the main image

// Charger le produit sélectionné
function loadProduct() {
    const foundProduct = allProducts.value.find((p) => p.id === productId.value);
    product.value = foundProduct || null; // Produit introuvable => null

    // Initialize the main image
    mainImage.value = product.value?.images[0] || null;
}

// Gérer les changements dynamiques
onMounted(loadProduct);
watch(route, (newRoute) => {
    productId.value = parseInt(newRoute.params.id) || null;
    loadProduct();
});
const selectedSize = ref(null);

const cart = ref([]); // Store cart items

function addToCart() {
    if (!product.value) return; // Ensure the product exists
    if (!selectedSize.value) {
        alert("Veuillez sélectionner une taille avant d'ajouter au panier."); // Alert if no size selected
        return;
    }

    // Add product to the cart with size
    cart.value.push({
        id: product.value.id,
        name: product.value.name,
        price: product.value.price,
        size: selectedSize.value,
    });

    // Optional: Log the cart or show confirmation
    console.log("Produit ajouté au panier :", {
        id: product.value.id,
        name: product.value.name,
        price: product.value.price,
        size: selectedSize.value,
    });

    alert("Produit ajouté au panier !");
}
</script>

<template>
    <navbar />
    <!-- Affichage du produit -->
    <div v-if="product" class="min-h-screen bg-gray-100 py-8">
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Galerie d'images -->
            <div>
                <div class="relative">
                    <img
                        :src="mainImage"
                        :alt="product.name"
                        class="w-full h-[550px] object-cover rounded-lg"
                    />
                </div>

                <!-- Miniatures -->
                <div class="flex space-x-4 mt-4">
                    <img
                        v-for="(image, index) in product.images"
                        :key="index"
                        :src="image"
                        :alt="`${product.name} Image ${index + 1}`"
                        class="w-[140PX] h-[140PX] object-cover rounded cursor-pointer hover:ring-2 hover:ring-blue-500"
                        @click="mainImage = image"
                    />
                </div>
            </div>

            <!-- Détails du produit -->
            <div class="bg-white p-6 rounded-lg shadow">
                <h1 class="text-2xl font-semibold text-gray-800">{{ product.name }}</h1>
                <div class="flex items-center space-x-2 mt-2">
                    <div class="flex text-yellow-400">
                        <i v-for="n in product.rating" :key="n" class="fa-solid fa-star"></i>
                    </div>
                    <span class="text-gray-500 text-sm">({{ product.rating }} avis)</span>
                </div>
                <div class="mt-4">
                    <p class="text-primary text-2xl font-bold">${{ product.price }}</p>
                    <p class="text-gray-400 text-sm line-through" v-if="product.oldPrice">
                        ${{ product.oldPrice }}
                    </p>
                </div>
                <p class="text-gray-600 mt-6 leading-6">{{ product.description }}</p>

                <!-- Sélection de taille -->
                <div class="mt-6">
                    <h3 class="text-lg font-medium text-gray-800">Taille :</h3>
                    <div class="flex space-x-4 mt-2">
                        <button
                            v-for="size in product.sizes"
                            :key="size"
                            :class="[
                'px-4 py-2 rounded text-sm',
                size === selectedSize ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
                            @click="selectedSize = size">
                            {{ size }}
                        </button>
                    </div>
                    <!-- Show selected size -->
                    <p v-if="selectedSize" class="mt-4 text-gray-800">Taille sélectionnée : {{ selectedSize }}</p>
                </div>

                <!-- Add to Cart Button -->
                <div class="p-4">
                    <button
                        class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-sm font-medium shadow-sm"
                    >
                        Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Produit non trouvé -->
    <div v-else class="min-h-screen flex items-center justify-center bg-gray-100">
        <p class="text-gray-600 text-lg">Produit introuvable.</p>
    </div>
    <Footer/>
</template>

<style scoped>
.hover\:ring-blue-500:hover {
    --tw-ring-color: #2563eb;
}
</style>

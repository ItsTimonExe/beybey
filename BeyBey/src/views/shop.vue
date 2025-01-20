<script setup>
import { ref, computed } from "vue";
import Footer from "../components/footer.vue";
import navbar from "../components/navBar.vue";


const initialCategories = [
    { id: 0, name: "All Products" },
    { id: 1, name: "T-Shirt" },
    { id: 2, name: "Hoodies" },
    { id: 3, name: "Pants" },
    { id: 5, name: "Accessories" },
];


const products = ref([
    {
        id: 1,
        name: "beyboy t-shirt",
        price: 45,
        oldPrice: 55.9,
        rating: 5,
        categoryName: "T-Shirt",
        image: new URL("../assets/image/t1.jpg", import.meta.url).href,
        hoverImage: new URL("../assets/image/t1-h.jpg", import.meta.url).href
    },
    {
        id: 2,
        name: "beyboy t-shirt",
        price: 120,
        oldPrice: 140,
        rating: 4,
        categoryName: "T-Shirt",
        image: new URL("../assets/image/t2.jpg", import.meta.url).href,
        hoverImage: new URL("../assets/image/t.jpg", import.meta.url).href
    },
    {
        id: 3,
        name: "beyboy t-shirt",
        price: 75,
        oldPrice: 100,
        rating: 5,
        categoryName: "T-Shirt",
        image: new URL("../assets/image/t3.jpg", import.meta.url).href,
        hoverImage: new URL("../assets/image/t.jpg", import.meta.url).href },
    {
        id: 4,
        name: "beyboy t-shirt",
        price: 89,
        oldPrice: 99,
        rating: 4,
        categoryName: "T-Shirt",
        image: new URL("../assets/image/t4.jpg", import.meta.url).href,
        hoverImage: new URL("../assets/image/t4-h.jpg", import.meta.url).href
    },
    {
        id: 5,
        name: "beyboy t-shirt",
        price: 89,
        oldPrice: 99,
        rating: 4,
        categoryName: "T-Shirt",
        image: new URL("../assets/image/t5.jpg", import.meta.url).href,
        hoverImage: new URL("../assets/image/t5-h.jpg", import.meta.url).href
    },
    {
        id: 6,
        name: "beyboy t-shirt",
        price: 89,
        oldPrice: 99,
        rating: 4,
        categoryName: "T-Shirt",
        image: new URL("../assets/image/t6.jpg", import.meta.url).href,
        hoverImage: new URL("../assets/image/t6-h.jpg", import.meta.url).href
    },
    { id: 7,
        name: "beyboy hoodie",
        price: 89,
        oldPrice: 99,
        rating: 4,
        categoryName: "Hoodies",
        image: new URL("../assets/image/t7.jpg", import.meta.url).href,
        hoverImage: new URL("../assets/image/t7-h.jpg", import.meta.url).href
    },
    { id: 8,
        name: "beyboy hoodie",
        price: 89,
        oldPrice: 99,
        rating: 4,
        categoryName: "Hoodies",
        image: new URL("../assets/image/t8.jpg", import.meta.url).href,
        hoverImage: new URL("../assets/image/t8-h.jpg", import.meta.url).href
    },
    { id: 9,
        name: "accessory item",
        price: 89,
        oldPrice: 99,
        rating: 4,
        categoryName: "Accessories",
        image: new URL("../assets/image/t9.jpg", import.meta.url).href,
        hoverImage: new URL("../assets/image/t9-h.jpg", import.meta.url).href
    },
]);

import { useRouter } from "vue-router";
const router = useRouter();

const goToProduct = (id) => {
    router.push(`/product/${id}`);
};

// État pour la catégorie sélectionnée et le tri
const selectedCategory = ref("All Products");
const sortOrder = ref("");

// Mise à jour dynamique des counts des catégories
const categories = computed(() => {
    return initialCategories.map((category) => {
        let count;

        if (category.name === "All Products") {

            count = products.value.length;
        } else {
            // Compter les produits correspondant à cette catégorie
            count = products.value.filter((product) => product.categoryName === category.name).length;
        }

        return {
            ...category,
            count, // Ajouter le compte calculé
        };
    });
});

// Produits filtrés par catégorie
const filteredProducts = computed(() => {
    if (selectedCategory.value === "All Products") {
        return products.value;
    }
    return products.value.filter(
        (product) => product.categoryName === selectedCategory.value
    );
});

// Produits triés après filtrage
const sortedProducts = computed(() => {
    const sorted = [...filteredProducts.value]; // Clonage des produits filtrés pour tri
    switch (sortOrder.value) {
        case "price-low-to-high":
            sorted.sort((a, b) => a.price - b.price);
            break;
        case "price-high-to-low":
            sorted.sort((a, b) => b.price - a.price);
            break;
        case "latest":
            sorted.sort((a, b) => b.id - a.id);
            break;
    }
    return sorted;
});
const isSidebarOpen = ref(false);
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
    <!-- Affichage du header -->
    <navbar />
    <div class="min-h-screen bg-gray-100">
        <!-- Shop Content -->
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 py-8">
            <!-- Filters Sidebar -->
            <!-- Bouton pour afficher ou masquer les catégories (Mobile) -->
            <button
                class="md:hidden fixed bottom-4 left-4 px-4 py-2 bg-blue-500 text-white text-lg rounded shadow-lg z-50"
                @click="toggleSidebar"
            >
                {{ isSidebarOpen ? "Hide Categories" : "Show Categories" }}
            </button>

            <!-- Sidebar (off-canvas) mobile -->
            <aside
                class="fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 z-50"
                :class="{ '-translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen }"
            >
                <div class="flex justify-between items-center p-4 border-b bg-blue-500 text-white">
                    <h2 class="text-xl font-semibold">Categories</h2>
                    <button @click="toggleSidebar" class="text-xl">✕</button>
                </div>
                <ul class="p-4">
                    <li
                        v-for="category in categories"
                        :key="category.id"
                        class="flex justify-between items-center border-b py-2 hover:bg-gray-100 cursor-pointer"
                        :class="{ 'font-bold': selectedCategory === category.name }"
                        @click="() => { selectedCategory = category.name; toggleSidebar(); }"
                    >
                        <span>{{ category.name }}</span>
                        <span class="text-sm text-gray-500">({{ category.count }})</span>
                    </li>
                </ul>
            </aside>

            <!-- Sidebar desktop (visible uniquement sur grand écran) -->
            <aside class="hidden md:block bg-white p-4 shadow rounded">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">Categories</h2>
                <ul>
                    <li
                        v-for="category in categories"
                        :key="category.id"
                        class="flex items-center justify-between border-b py-2 cursor-pointer"
                        :class="{ 'font-bold': selectedCategory === category.name }"
                        @click="selectedCategory = category.name"
                    >
                        <span class="text-gray-600">{{ category.name }}</span>
                        <span class="text-sm text-gray-500">({{ category.count }})</span>
                    </li>
                </ul>
            </aside>

            <!-- Products -->
            <main class="col-span-1 md:col-span-3 min-h-screen py-10 px-4 md:px-10">
                <!-- Sorting Options -->
                <div class="mb-4">
                    <select
                        v-model="sortOrder"
                        class="bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded shadow-sm text-sm focus:ring-primary focus:border-primary"
                    >
                        <option value="">Default Sorting</option>
                        <option value="price-low-to-high">Price Low to High</option>
                        <option value="price-high-to-low">Price High to Low</option>
                        <option value="latest">Latest</option>
                    </select>
                </div>
                <!-- Products Grid -->
                <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <!-- Product Card -->
                    <div
                        v-for="product in sortedProducts"
                        :key="product.id"
                        class="bg-white shadow rounded overflow-hidden group cursor-pointer"
                    >
                        <div class="relative" @click="goToProduct(product.id)">
                            <img
                                :src="product.image"
                                :alt="product.name"
                                class="w-full h-60 object-cover transition-opacity duration-300 group-hover:opacity-0"
                            />
                            <img
                                :src="product.hoverImage"
                                :alt="product.name"
                                class="absolute inset-0 w-full h-60 object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                            />
                        </div>
                        <div class="p-4" @click="goToProduct(product.id)">
                            <h3 class="text-lg font-semibold text-gray-800">
                                {{ product.name }}
                            </h3>
                            <div class="flex items-center justify-between mt-2">
                                <p class="text-primary text-xl font-bold">{{ product.price }}DT</p>
                                <p class="text-gray-400 line-through">{{ product.oldPrice }}DT</p>
                            </div>
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
                <!-- ./Product Card -->


            </main>
        </div>
        <!-- Footer -->
        <Footer />
    </div>
</template>

<style scoped>
/* Ajoutez des styles si nécessaire */
</style>

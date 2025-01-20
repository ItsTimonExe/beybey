<template>
    <div class="bg-gray-100">
        <navbar />
        <!-- Hero Section -->
        <section class="relative bg-gray-900 text-white h-screen flex items-center justify-center">
            <video
                autoplay
                loop
                muted
                playsinline
                class="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
            >
                <source src="../assets/image/bg2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div class="relative z-10 text-center space-y-6 animate__animated animate__fadeIn">
                <h1 class="text-5xl font-bold md:text-6xl">
                    Welcome to <span class="text-blue-500">Bey&Bey</span>
                </h1>
                <p class="text-lg md:text-xl text-gray-300 animate__animated animate__slideInUp">
                    Discover trending products and exclusive deals.
                </p>

                <a
                    href="/shop"
                    class="inline-block px-8 py-3 bg-blue-500 text-white text-lg font-semibold rounded hover:bg-blue-600"
                >
                    Shop Now
                </a>
            </div>
        </section>

        <!-- Product Card -->
        <section class="min-h-screen py-10 px-4 md:px-10">
            <h2 class="text-3xl font-bold text-center mb-10">
                Art & Comfort every day
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                <div
                    v-for="product in products"
                    :key="product.id"
                    class="bg-white shadow-md rounded-lg overflow-hidden group transform transition duration-300 hover:scale-105"
                >
                    <!-- Image Section -->
                    <div class="relative" @click="goToProduct(product.id)">
                        <img
                            :src="product.image"
                            :alt="product.name"
                            class="w-full h-49 object-cover transition-opacity duration-300 group-hover:opacity-0"
                        />
                        <img
                            :src="product.hoverImage"
                            :alt="product.name"
                            class="absolute top-0 left-0 w-full h-49 object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                        />
                    </div>

                    <!-- Product Info -->
                    <div class="p-4" @click="goToProduct(product.id)">
                        <h3 class="text-lg font-semibold text-gray-800 truncate">
                            {{ product.name }}
                        </h3>
                        <div class="flex items-center justify-between mt-2">
                            <p class="text-primary text-xl font-bold">{{ product.price }} DT</p>
                            <p
                                v-if="product.oldPrice"
                                class="text-gray-500 line-through text-sm"
                            >
                                {{ product.oldPrice }} DT
                            </p>
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
        </section>

        <div class="relative w-full overflow-hidden bg-gray-900 text-white py-2">
            <div class="flex whitespace-nowrap animate-marquee">
            <span v-for="i in 1000" :key="i" class="text-lg font-bold uppercase mx-8">
            Free shipping on purchases over 300 DT
            </span>
            </div>
        </div>
        <!-- Swiper Section: Special Offers -->
        <section class="py-16 bg-gray-100">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-10">
                    Special Offers
                </h2>
                <swiper

                    :slides-per-view="1"
                    :loop="true"
                    :pagination="{ clickable: true }"

                    :autoplay="{ delay: 3000 }"
                    :space-between="16"
                    :breakpoints="{ 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }"
                    class="h-96"
                >
                    <swiper-slide
                        v-for="offer in specialOffers"
                        :key="offer.id"
                        class="rounded-lg shadow-lg overflow-hidden"
                    >
                        <img
                            :src="offer.image"
                            :alt="offer.title"
                            class="h-56 w-full object-cover"
                        />
                        <div class="p-6 bg-white">
                            <h3 class="text-lg font-semibold">{{ offer.title }}</h3>
                            <p class="mt-2 text-gray-600">
                                {{ offer.description }}
                            </p>
                            <a
                                href="/shop"
                                class="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Shop Now
                            </a>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </section>

        <!-- Why Choose Us Section -->
        <section class="py-16 bg-gray-900 text-white">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl font-bold mb-6 opacity-0 translate-y-5 animate-slide-in-up">
                    Why Choose Us
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <!-- Card 1 -->
                    <div
                        class="p-6 bg-gray-800 rounded-lg transform transition duration-500 hover:scale-105 hover:shadow-lg hover:rotate-3"
                    >
                        <img src="../assets/icons/i3.gif" alt="Quality" class="w-[100px] h-[100px] mx-auto mb-4" />
                        <h3 class="font-bold text-lg">High Quality</h3>
                        <p class="text-gray-400 mt-2">
                            We guarantee that every product meets the highest standards of quality.
                        </p>
                    </div>
                    <!-- Card 2 -->
                    <div
                        class="p-6 bg-gray-800 rounded-lg transform transition duration-500 hover:scale-105 hover:shadow-lg hover:rotate-2"
                    >
                        <img src="../assets/icons/i1.gif" alt="Fast Delivery" class="w-[100px] h-[100px] mx-auto mb-4" />
                        <h3 class="font-bold text-lg">Fast Delivery</h3>
                        <p class="text-gray-400 mt-2">
                            Get your products delivered quickly with our trusted logistics partners.
                        </p>
                    </div>
                    <!-- Card 3 -->
                    <div
                        class="p-6 bg-gray-800 rounded-lg transform transition duration-500 hover:scale-105 hover:shadow-lg hover:-rotate-2"
                    >
                        <img src="../assets/icons/i4.gif" alt="Customer Support" class="w-[100px] h-[100px] mx-auto mb-4" />
                        <h3 class="font-bold text-lg">24/7 Support</h3>
                        <p class="text-gray-400 mt-2">
                            Our customer support team is here to help you anytime, anywhere.
                        </p>
                    </div>
                    <!-- Card 4 -->
                    <div
                        class="p-6 bg-gray-800 rounded-lg transform transition duration-500 hover:scale-105 hover:shadow-lg hover:-rotate-3"
                    >
                        <img src="../assets/icons/i2.gif" alt="Secure Payment" class="w-[100px] h-[100px] mx-auto mb-4" />
                        <h3 class="font-bold text-lg">Secure Payment</h3>
                        <p class="text-gray-400 mt-2">
                            We provide the most secure and reliable payment options available.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Instagram Section -->
        <section class="bg-white text-black py-10 px-6">
            <div class="max-w-7xl mx-auto">
                <p class="text-sm uppercase tracking-wide text-gray-400">Stay in Touch</p>
                <h2 class="text-4xl font-bold mt-2">Moments Made Memories</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                    <div v-for="(image, index) in IMAGE_TABLE" :key="index" class="overflow-hidden">
                        <img :src="image" alt="Fashion moment" class="w-full h-auto object-cover" />
                    </div>
                </div>
                <div class="text-right mt-6">
                    <a href="https://www.instagram.com/beyandbey/?hl=fr" class="inline-flex items-center space-x-2 text-black font-semibold ">
                        <span>Get Inspired with</span>
                        <span class="text-blue-400">@Bey&Bey</span>
                    </a>
                </div>
            </div>
        </section>
        <Footer />
    </div>
</template>

<script setup>
import Footer from "../components/footer.vue";
import navbar from "../components/navBar.vue";
import 'swiper/css/pagination';
import {ref} from "vue";
import {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/swiper-bundle.css";
const IMAGE_TABLE = ref( [
    new URL("../assets/image/p5.jpg", import.meta.url).href,
    new URL("../assets/image/p7.jpg", import.meta.url).href,
    new URL("../assets/image/p6.jpg", import.meta.url).href,
    new URL("../assets/image/p8.jpg", import.meta.url).href,
]);
const specialOffers = ref([
    {
        id: 1,
        title: "50% Off hoodies",
        description: "Discover the best deals on trendy fashion items.",
        image: new URL("../assets/image/p1.jpg", import.meta.url).href
    },
    { id: 2,
        title: "Buy One, Get One Free",
        description: "Exclusive offer on stylish clothing and fashion essentials.",
        image: new URL("../assets/image/bg.jpg", import.meta.url).href
    },

    { id: 3,
        title: "Home Essentials",
        description: "Up to 40% off your favorite fashion and clothing collections.",
        image: new URL("../assets/image/p3.jpg", import.meta.url).href
    },
    { id: 4,
        title: "Home Essentials",
        description: "Up to 40% off your favorite fashion and clothing collections.",
        image: new URL("../assets/image/p3.jpg", import.meta.url).href
    },
    { id: 5,
        title: "Home Essentials",
        description: "Up to 40% off your favorite fashion and clothing collections.",
        image: new URL("../assets/image/p3.jpg", import.meta.url).href
    },
]);
const products = ref([
    {
        id: 1,
        name: "BeyBoy t-shirt",
        price: 45,
        oldPrice: 55.9,
        rating: 5,
        image: new URL("../assets/image/t1.jpg", import.meta.url).href,
        hoverImage: new URL("../assets/image/t1-h.jpg", import.meta.url).href,
    },
    {
        id: 2,
        name: "BeyBoy t-shirt ",
        price: 120,
        oldPrice: 140,
        rating: 4,
        image: new URL("../assets/image/t2.jpg", import.meta.url).href,
        hoverImage: new URL("../assets/image/t.jpg", import.meta.url).href,
    },
    {
        id: 3,
        name: "BeyBoy t-shirt",
        price: 75,
        oldPrice: 100,
        rating: 5,
        image: new URL("../assets/image/t3.jpg", import.meta.url).href,
        hoverImage: new URL("../assets/image/t.jpg", import.meta.url).href,
    },
    {
        id: 4,
        name: "BeyBoy t-shirt",
        price: 89,
        oldPrice: 99,
        rating: 4,
        image: new URL("../assets/image/t4.jpg", import.meta.url).href,
        hoverImage: new URL("../assets/image/t4-h.jpg", import.meta.url).href,
    },
    {
        id: 5,
        name: "BeyBoy t-shirt",
        price: 89,
        oldPrice: 99,
        rating: 4,
        image: new URL("../assets/image/t5.jpg", import.meta.url).href,
        hoverImage: new URL("../assets/image/t5-h.jpg", import.meta.url).href,
    },
    {
        id: 6,
        name: "BeyBoy t-shirt",
        price: 89,
        oldPrice: 99,
        rating: 4,
        image: new URL("../assets/image/t6.jpg", import.meta.url).href,
        hoverImage: new URL("../assets/image/t6-h.jpg", import.meta.url).href,
    },
    {
        id: 7,
        name: "BeyBoy t-shirt",
        price: 89,
        oldPrice: 99,
        rating: 4,
        image: new URL("../assets/image/t7.jpg", import.meta.url).href,
        hoverImage: new URL("../assets/image/t7-h.jpg", import.meta.url).href,
    },
    {
        id: 8,
        name: "BeyBoy t-shirt",
        price: 89,
        oldPrice: 99,
        rating: 4,
        image: new URL("../assets/image/t8.jpg", import.meta.url).href,
        hoverImage: new URL("../assets/image/t8-h.jpg", import.meta.url).href,
    },

]);

import { useRouter } from "vue-router";
const router = useRouter();
const goToProduct = (id) => {
    router.push(`/product/${id}`); // Redirection vers la page produit/id
};

</script>

<style scoped>

@keyframes marquee {
    from {
        transform: translateX(1%);
    }
    to {
        transform: translateX(-10000%);
    }
}

.animate-marquee {
    display: flex;
    animation: marquee 1500s linear infinite;
}
</style>

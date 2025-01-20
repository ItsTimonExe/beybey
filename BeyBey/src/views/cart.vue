<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Footer from "../components/footer.vue";
import navbar from "../components/navBar.vue";

// Données des articles du panier (réactif)
const cartItems = ref([
    {
        id: 1,
        name: "Product 1",
        price: 29.99,
        quantity: 2,
        image: new URL("../assets/image/t1-h.jpg", import.meta.url).href,
    },
    {
        id: 2,
        name: "Product 2",
        price: 49.99,
        quantity: 1,
        image: new URL("../assets/image/t8-h.jpg", import.meta.url).href,
    },
    {
        id: 3,
        name: "Product 3",
        price: 19.99,
        quantity: 3,
        image: new URL("../assets/image/t5-h.jpg", import.meta.url).href,
    },
]);

const discountCode = ref(""); // Code promo entré par l'utilisateur
const isCodeApplied = ref(false); // Indique si le code promo est valide
const discountValue = ref(0); // Valeur de la remise
const showDiscountMessage = ref(false); // Contrôle l'affichage des messages de remise

// Fonction pour formater les montants
const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);
};

// Calculer le sous-total
const calculateSubtotal = () => {
    return cartItems.value.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
};

// Calculer les taxes
const calculateTaxes = () => {
    return calculateSubtotal() * 0.1; // Supposons un taux de taxes à 10%
};

// Calculer le total après remise
const calculateTotal = () => {
    return calculateSubtotal() + calculateTaxes() - discountValue.value;
};

// Appliquer un code promo
const applyDiscountCode = () => {
    showDiscountMessage.value = true; // Permet d'afficher les messages après clic sur le bouton
    if (discountCode.value === "PROMO10") {
        discountValue.value = calculateSubtotal() * 0.1; // Réduction de 10%
        isCodeApplied.value = true;
    } else {
        discountValue.value = 0;
        isCodeApplied.value = false;
    }
};

// Rafraîchir le panier après chaque modification
const refreshCart = () => {
    applyDiscountCode(); // Réapplique la remise lors du rafraîchissement
};

// Supprimer un article du panier
const removeItem = (id) => {
    cartItems.value = cartItems.value.filter((item) => item.id !== id);
    refreshCart(); // Met à jour le panier après suppression
};

// Modifier la quantité d'un produit
const updateQuantity = (item, change) => {
    item.quantity += change;
    if (item.quantity < 1) {
        removeItem(item.id); // Supprime l'article si quantité devient 0
    } else {
        refreshCart(); // Rafraîchit le panier sinon
    }
};

// Rediriger vers la page de paiement
const router = useRouter();
const goToCheckout = () => {
    router.push("/checkout");
};
</script>

<template>
    <navbar />
    <div class="container mx-auto p-8 space-y-12">
        <!-- Titre de la page -->
        <h1 class="text-5xl font-extrabold text-transparent bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-500 bg-clip-text text-center">
            My Cart
        </h1>

        <!-- Contenu principal -->
        <div v-if="cartItems.length > 0" class="grid lg:grid-cols-12 gap-10">
            <!-- Liste des produits -->
            <div class="lg:col-span-8 space-y-6">
                <div
                    v-for="item in cartItems"
                    :key="item.id"
                    class="relative flex flex-col sm:flex-row items-center gap-6 p-6 bg-white border border-gray-200 rounded-3xl shadow-md hover:shadow-xl transition"
                >
                    <!-- Image du produit -->
                    <div class="w-24 h-24 rounded-xl overflow-hidden">
                        <img
                            :src="item.image"
                            :alt="item.name"
                            class="w-full h-full object-cover transform hover:scale-110 transition duration-300"
                        />
                    </div>

                    <!-- Détails du produit -->
                    <div class="flex-1">
                        <h2 class="text-xl font-semibold text-gray-800">
                            {{ item.name }}
                        </h2>
                        <div class="text-gray-600">
                            <p class="text-sm">
                                Unit Price:
                                <span class="font-bold text-teal-500">
                                    {{ formatCurrency(item.price) }}
                                </span>
                            </p>
                            <p class="text-sm">
                                Quantity:
                                <span class="font-bold text-gray-700">
                                    {{ item.quantity }}
                                </span>
                            </p>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex items-center gap-4">
                        <button
                            @click="updateQuantity(item, -1)"
                            :disabled="item.quantity <= 1"
                            class="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
                        >
                            -
                        </button>

                        <div class="text-lg font-semibold">{{ item.quantity }}</div>

                        <button
                            @click="updateQuantity(item, 1)"
                            class="w-10 h-10 flex items-center justify-center bg-teal-600 text-white rounded-full hover:bg-teal-700 transition"
                        >
                            +
                        </button>

                        <button
                            @click="removeItem(item.id)"
                            class="w-10 h-10 flex items-center justify-center bg-red-100 text-red-500 rounded-full hover:bg-red-200 transition"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            </div>

            <!-- Section Résumé -->
            <div class="lg:col-span-4 p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-lg">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Summary
                </h2>

                <!-- Liste des produits dans le résumé -->
                <div v-for="item in cartItems" :key="item.id" class="flex justify-between items-center mb-4">
                    <span class="text-gray-600">{{ item.name }} (x{{ item.quantity }})</span>
                    <span class="font-medium">{{ formatCurrency(item.price * item.quantity) }}</span>
                </div>

                <hr class="my-4 border-gray-300" />

                <!-- Champ Code Promo -->
                <div class="mb-4">
                    <input
                        v-model="discountCode"
                        type="text"
                        placeholder="Discount Code"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                        @click="applyDiscountCode"
                        class="w-full mt-2 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                    >
                        Apply
                    </button>
                    <p v-if="showDiscountMessage && isCodeApplied" class="text-sm text-green-500 mt-2">
                        Discount code successfully applied!
                    </p>
                    <p v-else-if="showDiscountMessage && !isCodeApplied" class="text-sm text-red-500 mt-2">
                        Invalid discount code.
                    </p>
                </div>

                <!-- Totaux -->
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Subtotal:</span>
                        <span class="font-medium">{{ formatCurrency(calculateSubtotal()) }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Taxes (10%):</span>
                        <span class="font-medium">{{ formatCurrency(calculateTaxes()) }}</span>
                    </div>
                    <div v-if="discountValue > 0" class="flex justify-between text-green-500 font-medium">
                        <span>Discount:</span>
                        <span>-{{ formatCurrency(discountValue) }}</span>
                    </div>
                </div>

                <hr class="my-4 border-gray-300" />

                <!-- Total final -->
                <div class="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span class="text-teal-500">{{ formatCurrency(calculateTotal()) }}</span>
                </div>

                <button
                    @click="goToCheckout"
                    class="w-full mt-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
                >
                    Go to Checkout
                </button>
            </div>
        </div>

        <!-- Message si le panier est vide -->
        <div v-else class="text-center">
            <h2 class="text-3xl font-bold text-gray-700">Your cart is empty</h2>
            <a
                href="/shop"
                class="mt-6 px-6 py-3 inline-block bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-lg shadow hover:shadow-xl"
            >
                Continue Shopping
            </a>
        </div>
    </div>
    <Footer />
</template>

<template>
    <div class="min-h-screen overflow-auto bg-gray-50">
        <!-- Bouton pour afficher/masquer le formulaire -->
        <button
            class="bg-blue-600 text-white px-6 py-2 rounded mb-4 hover:bg-blue-700 transition"
            @click="toggleAddProduct"
        >
            {{ newProduct.id ? "Modifier le Produit" : "Ajouter un Produit" }}
        </button>

        <!-- Formulaire d'ajout/modification -->
        <transition name="fade">
            <div v-if="showAddProductForm" class="bg-white shadow p-4 rounded mb-6">
                <h2 class="font-bold text-lg mb-4">
                    {{ newProduct.id ? "Modifier le Produit" : "Ajouter un Produit" }}
                </h2>
                <div class="mb-4">
                    <label class="block font-medium mb-1">Nom du Produit :</label>
                    <input
                        type="text"
                        v-model="newProduct.name"
                        class="px-4 py-2 rounded border w-full"
                    />
                </div>
                <div class="mb-4">
                    <label class="block font-medium mb-1">Prix :</label>
                    <input
                        type="number"
                        v-model="newProduct.price"
                        class="px-4 py-2 rounded border w-full"
                    />
                </div>
                <div class="mb-4">
                    <label class="block font-medium mb-1">Quantité :</label>
                    <input
                        type="number"
                        v-model="newProduct.quantity"
                        class="px-4 py-2 rounded border w-full"
                    />
                </div>
                <div class="mb-4">
                    <label class="block font-medium mb-1">Image Avant :</label>
                    <input
                        type="file"
                        accept="image/*"
                        @change="onFileChange($event, 'front')"
                        class="px-4 py-2 w-full border rounded"
                    />
                    <div v-if="newProduct.frontImage" class="mt-2">
                        <img
                            :src="newProduct.frontImage"
                            alt="Aperçu Image Avant"
                            class="w-20 h-20 object-cover rounded"
                        />
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block font-medium mb-1">Image Arrière :</label>
                    <input
                        type="file"
                        accept="image/*"
                        @change="onFileChange($event, 'back')"
                        class="px-4 py-2 w-full border rounded"
                    />
                    <div v-if="newProduct.backImage" class="mt-2">
                        <img
                            :src="newProduct.backImage"
                            alt="Aperçu Image Arrière"
                            class="w-20 h-20 object-cover rounded"
                        />
                    </div>
                </div>
                <button
                    class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                    @click="addProduct"
                >
                    {{ newProduct.id ? "Modifier" : "Ajouter" }}
                </button>
            </div>
        </transition>

        <!-- Champ de recherche -->
        <div class="mb-4">
            <input
                type="text"
                v-model="searchQuery"
                placeholder="Rechercher un produit..."
                class="px-4 py-2 border rounded w-full"
            />
        </div>

        <!-- Liste des produits -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
                v-for="product in filteredProducts"
                :key="product.id"
                class="p-4 bg-white shadow rounded flex flex-col items-center"
            >
                <div class="flex gap-4">
                    <div class="w-32 h-32 bg-gray-200 flex items-center justify-center rounded">
                        <img
                            :src="product.frontImage"
                            alt="Front Image"
                            class="object-cover w-full h-full rounded"
                        />
                    </div>
                    <div class="w-32 h-32 bg-gray-200 flex items-center justify-center rounded">
                        <img
                            :src="product.backImage"
                            alt="Back Image"
                            class="object-cover w-full h-full rounded"
                        />
                    </div>
                </div>
                <div class="mt-4 text-center">
                    <p class="font-bold">{{ product.name }}</p>
                    <p class="text-gray-500">
                        Prix : {{ product.price }} € | Quantité : {{ product.quantity }}
                    </p>
                </div>
                <div class="flex gap-4 mt-4">
                    <button
                        class="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
                        @click="editProduct(product)"
                    >
                        Modifier
                    </button>
                    <button
                        class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        @click="deleteProduct(product.id)"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showAddProductForm: false,
            newProduct: {
                id: null,
                name: "",
                price: 0,
                quantity: 0,
                frontImage: null,
                backImage: null,
            },
            searchQuery: "",
            products: [
                {
                    id: 1,
                    name: "Produit A",
                    price: 20,
                    quantity: 100,
                    frontImage: "https://via.placeholder.com/150?text=Front",
                    backImage: "https://via.placeholder.com/150?text=Back",
                },
                {
                    id: 2,
                    name: "Produit B",
                    price: 25,
                    quantity: 50,
                    frontImage: "https://via.placeholder.com/150?text=Front",
                    backImage: "https://via.placeholder.com/150?text=Back",
                },
            ],
        };
    },
    computed: {
        filteredProducts() {
            return this.products.filter((product) =>
                product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
    },
    methods: {
        toggleAddProduct() {
            this.showAddProductForm = !this.showAddProductForm;
            if (!this.showAddProductForm) {
                this.clearForm();
            }
        },
        onFileChange(event, type) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (type === "front") {
                        this.newProduct.frontImage = e.target.result;
                    } else if (type === "back") {
                        this.newProduct.backImage = e.target.result;
                    }
                };
                reader.readAsDataURL(file); // Convertit l'image en Base64
            }
        },
        addProduct() {
            const { name, price, quantity, frontImage, backImage } = this.newProduct;
            if (!name || price <= 0 || quantity <= 0 || !frontImage || !backImage) {
                alert("Tous les champs doivent être remplis correctement.");
                return;
            }

            if (this.newProduct.id) {
                const index = this.products.findIndex((p) => p.id === this.newProduct.id);
                this.products.splice(index, 1, { ...this.newProduct });
            } else {
                const id = this.products.length + 1;
                this.products.push({ ...this.newProduct, id });
            }

            this.clearForm();
        },
        deleteProduct(id) {
            this.products = this.products.filter((product) => product.id !== id);
        },
        editProduct(product) {
            this.newProduct = { ...product };
            this.showAddProductForm = true;
        },
        clearForm() {
            this.newProduct = {
                id: null,
                name: "",
                price: 0,
                quantity: 0,
                frontImage: null,
                backImage: null,
            };
            this.showAddProductForm = false;
        },
    },
};
</script>

<style scoped>
.grid {
    display: grid;
}
img {
    object-fit: cover;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>

<template>
    <ul class="space-y-4">
        <li
            v-for="item in navItems"
            :key="item.key"
            :class="{ 'bg-gray-200 font-bold': activeItem === item.key }"
            @click="navigate(item.key)"
            @keydown.enter="navigate(item.key)"
            @keydown.space.prevent="navigate(item.key)"
            class="p-3 rounded cursor-pointer transition hover:bg-gray-100"
            role="button"
            tabindex="0"
        >
            <i :class="[item.icon, 'mr-3']"></i>
            {{ item.label }}
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            navItems: [
                { key: "dashboard", label: "Tableau de Bord", icon: "fas fa-tachometer-alt" },
                { key: "products", label: "Produits", icon: "fas fa-box" },
                { key: "users", label: "Utilisateurs", icon: "fas fa-users" },
                { key: "history", label: "Historique des Commandes", icon: "fas fa-history" },
            ],
            activeItem: "dashboard", // Clé active par défaut
        };
    },
    methods: {
        navigate(key) {
            if (!this.navItems.some(item => item.key === key)) {
                console.warn(`Clé invalide : ${key}`);
                return;
            }
            this.activeItem = key;
            this.$emit("navigate", key);
        },
    },
};
</script>

<style scoped>
.transition {
    transition: background-color 0.2s;
}
</style>

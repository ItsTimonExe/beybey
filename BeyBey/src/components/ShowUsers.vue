<template>
    <div>
        <h2 class="font-bold text-lg mb-4">Liste des Utilisateurs</h2>
        <ul>
            <li
                v-for="user in users"
                :key="user.id"
                class="p-4 bg-white shadow rounded mb-4"
            >
                <p class="font-bold">{{ user.name }}</p>
                <p>Email : {{ user.email }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: [
                { id: 1, name: "Jean Dupont", email: "jean.dupont@example.com" },
                { id: 2, name: "Marie Curie", email: "marie.curie@example.com" },
                { id: 3, name: "Albert Einstein", email: "albert.einstein@example.com" },
            ],
        };
    },
};
</script>

<style scoped>
ul {
    list-style: none;
}
</style>

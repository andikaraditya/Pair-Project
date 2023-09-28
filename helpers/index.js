class AllHelper {
    static toRupiah(value) {
        return value.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR"
        })
    }
}

module.exports = AllHelper
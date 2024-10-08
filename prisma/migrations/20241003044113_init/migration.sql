-- CreateTable
CREATE TABLE `customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `addressCustomer` VARCHAR(255) NOT NULL,
    `nameCustomer` VARCHAR(255) NOT NULL,
    `phoneCustomer` INTEGER NOT NULL,
    `imageCustomer` VARCHAR(255) NOT NULL,
    `id_zaLo` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

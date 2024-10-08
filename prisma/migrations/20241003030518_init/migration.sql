-- CreateTable
CREATE TABLE `user` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `pass_word` VARCHAR(255) NOT NULL,
    `phone` INTEGER NOT NULL,
    `birth_day` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booktable` (
    `id_booktable` INTEGER NOT NULL AUTO_INCREMENT,
    `codeTable` INTEGER NOT NULL,
    `checkIn` VARCHAR(255) NOT NULL,
    `checkOut` VARCHAR(255) NOT NULL,
    `quantityGuest` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
    `idTable` INTEGER NOT NULL,

    INDEX `id_user`(`id_user`),
    INDEX `idTable`(`idTable`),
    PRIMARY KEY (`id_booktable`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tableBook` (
    `idTable` INTEGER NOT NULL AUTO_INCREMENT,
    `nameTable` VARCHAR(255) NOT NULL,
    `guest` INTEGER NOT NULL,
    `mo_ta` VARCHAR(255) NOT NULL,
    `gia_tien` INTEGER NOT NULL,
    `do_xe` BOOLEAN NOT NULL DEFAULT false,
    `image` VARCHAR(255) NOT NULL,
    `idLocation` INTEGER NOT NULL,

    INDEX `idLocation`(`idLocation`),
    PRIMARY KEY (`idTable`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `id_comment` INTEGER NOT NULL AUTO_INCREMENT,
    `codeComment` INTEGER NOT NULL,
    `dayComment` VARCHAR(255) NOT NULL,
    `contentComment` VARCHAR(255) NOT NULL,
    `voteComment` INTEGER NOT NULL,
    `idTable` INTEGER NOT NULL,

    INDEX `idTable`(`idTable`),
    PRIMARY KEY (`id_comment`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `localtionRestaurant` (
    `idLocation` INTEGER NOT NULL AUTO_INCREMENT,
    `nameLocation` VARCHAR(255) NOT NULL,
    `tinh_thanh` VARCHAR(255) NOT NULL,
    `quoc_gia` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`idLocation`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `booktable` ADD CONSTRAINT `booktable_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `booktable` ADD CONSTRAINT `booktable_ibfk_2` FOREIGN KEY (`idTable`) REFERENCES `tableBook`(`idTable`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tableBook` ADD CONSTRAINT `phong_ibfk_1` FOREIGN KEY (`idLocation`) REFERENCES `localtionRestaurant`(`idLocation`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`idTable`) REFERENCES `tableBook`(`idTable`) ON DELETE NO ACTION ON UPDATE NO ACTION;

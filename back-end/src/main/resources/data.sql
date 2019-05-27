insert into PET values(1000,'Pixel','available');
insert into PET values(2000,'Max', 'sold');


insert into PETCATEGORY values(1,'Dog');
insert into PETCATEGORY values(2,'Cat');
insert into PETCATEGORY values(3,'Bird');
insert into PETCATEGORY values(4,'Hamster');

insert into PETTAGS values(1,'Soft');
insert into PETTAGS values(2,'Aggressive');
insert into PETTAGS values(3,'Friendly');
insert into PETTAGS values(4,'Hunter');
insert into PETTAGS values(5,'Protector');


insert into PET_TAG_MAPPING values(1000,3);
insert into PET_TAG_MAPPING values(1000,4);
insert into PET_TAG_MAPPING values(2000,5);

insert into PET_CAT_MAPPING values(1, 1000);/* Category, Pet */
insert into PET_CAT_MAPPING values(4, 2000);


insert into PHOTOS values(1000,'https://image.shutterstock.com/image-photo/siberian-husky-1-year-old-450w-65820013.jpg');
insert into PHOTOS values(1000,'https://static3.depositphotos.com/1007517/228/i/950/depositphotos_2289131-stock-photo-siberian-husky.jpg');
insert into PHOTOS values(1000,'https://pohanskykruh.files.wordpress.com/2013/07/vlkous.jpg');
insert into PHOTOS values(2000,'https://cdn.omlet.co.uk/images/originals/hamsters-make-great-pets.jpg');
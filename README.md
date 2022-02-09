

# Kelajak | CRM


<!-- # User model
```
name
surname
phone
email
password
image
status [active, noactive]
role [admin, moderator, user]
uid
date

```





<!-- # Course model
```
title
description
image
price
author_name
rating
moreSeenCourse: 0
date

``` -->






<!-- 
# Section model
```
name
course_ID (get from Course model)
date

``` -->




<!-- # Video model
```
title
description
video_time 
video
tag
rating
counter
course_ID (get from Course model)
section_ID (get from Section model)
date.
``` --> 




<!-- # Pdf model
```
title
description
pdf
course_ID (get from Course model)
section_ID (get from Section model)
date
``` -->



<!-- 
# Test_Collection model
```
collection_name
section_ID (get from Section model)
``` -->






<!-- # Test model
```
question
answers: [{
    answer
    type [0,1]
}]
course_ID (get from Course model)
section_ID (get from Section model)
collection_ID (get from Test_Collection model)
date
``` -->





<!-- # Result model
```
result
totalQuestion
user_ID (get from User model)
course_ID (get from Course model)
section_ID (get from Section model)
collection_ID (get from Test_Collection model)
date

``` -->



<!-- # Help model
```
question
answer
date
``` -->



<!-- # Advertisement model (Reklama)
```
image
date
``` -->



<!-- # Team model (Info)
```
name
image
practice_time
position
date
``` -->



<!-- # Contact model (User kurs olish uchun adminga dostub beradi)
```
course_ID (get from Course model)
username
phone
message
date
``` -->



<!-- # My Subject model (Admin kelgan dostup uchun userni qaysidir fanga qoshadi)
```
user_ID (get from User model)
course_ID (get from Course model)
date
``` -->



<!-- # News model
```
title
description
image
counter
tags
date

``` -->

Test larni ishga tushirish uchun qilinadigan ishlar.

1. test ishlaydigan pageni render qilish
2. watch_video fayldan collection id bn test page ga o'tkazish.
3. backend ga req.params idni ushlab olib usha bo'yicha kerakli collection ni olish.
9860 1301 4482 3838
Asal Asadova







Qolgan ishlar.


1. Glavniy page ga tekin reklama.
2. kirish , ro'yhatdan o'tishni headerga chiqarish. Bajarildi
3. Bo'limlar, Xizmatlarni to'g'rlash.
4. Footerga rasm qo'shish logotip kelajak.biz
5. user profil ni sozlash.
6. Mening natijalarimga natija qo'shish.
7. pulli testda qaysi yechilgan qaysi yechiklmaganini ko'rishni qo'shish.
8. Formularni chiqarish.


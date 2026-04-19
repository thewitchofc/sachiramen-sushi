/**
 * קטלוג תפריט — מעודכן לפי התפריט הדיגיטלי (Wolt).
 * tags: popular | veg | spicy
 * priceDisplay: מחרוזת חלופית למחיר (למשל יין כוס/בקבוק)
 * subsections: תתי־קטגוריות תחת כותרת אחת (למשל אלכוהול)
 *
 * id: חובה לפריט בלי ‎/media/menu/menu-*.jpg — אחרת נגזר משם הקובץ.
 * description: תיאור ארוך לדף מנה (אופציונלי); אם ריק — לא מוצג ב־DishPage.
 * comboItems: לקומבינציות — מערך { rollId }; rollId = id מנה מהתפריט (getDishById).
 * לכל אובייקט קטגוריה ברמה העליונה: id (מחרוזת יציבה) ל־data-category ולניווט דביק.
 */
export const menuCategories = [
  {
    id: "starters",
    title: "ראשונות",
    items: [
      {
        name: "סשימי סאצ׳י",
        desc: "סלמון נא, עשבי תיבול, צ׳ילי, רוטב פונזו־הדרים ויוזו קושו.",
        price: 56,
        image: "/media/menu/menu-sashimi-sachi.jpg",
      },
      {
        name: "סלט אטריות זכוכית",
        desc: "כרוב סגול, גזר, מלפפון, ויניגרט פונזו־יוזו, צ׳ילי, בצל ירוק וקשיו קלוי.",
        price: 48,
        image: "/media/menu/menu-starter-glass-salad.jpg",
        tags: ["veg"],
      },
      {
        name: "מלפפונים & שומשום",
        desc: "מלפפון, בוטנים, שומשום לבן קלוי, בצל ירוק ורוטב סויה־קרמל.",
        price: 29,
        image: "/media/menu/menu-starter-cucumber.jpg",
        tags: ["veg"],
      },
      {
        name: "גיוזה ירקות מקורמלים (4 יח׳)",
        desc: "מילוי כרוב, רוטב סויה־שומשום ובצל ירוק.",
        price: 55,
        image: "/media/menu/menu-starter-gyoza-veg.jpg",
        tags: ["veg"],
      },
      {
        name: "גיוזה פטריות שיטאקי (5 יח׳)",
        desc: "מילוי פטריות שיטאקי, רוטב סויה־שומשום ובצל ירוק.",
        price: 48,
        image: "/media/menu/menu-starter-gyoza-shiitake.jpg",
        tags: ["veg"],
      },
      {
        name: "גיוזה עוף (5 יח׳)",
        desc: "מילוי עוף, רוטב סויה־שומשום ובצל ירוק.",
        price: 48,
        image: "/media/menu/menu-starter-gyoza-chicken.jpg",
        tags: ["popular"],
      },
      {
        name: "גיוזה בשר מפורק (4 יח׳)",
        desc: "מילוי בשר מפורק, רוטב סויה־שומשום ובצל ירוק.",
        price: 55,
        image: "/media/menu/menu-starter-gyoza-meat.jpg",
      },
    ],
  },
  {
    id: "yakitori",
    title: "יקיטורי",
    items: [
      {
        name: "יקיטורי סלמון (2 יח׳)",
        desc: "נתחי סלמון על מקל, צלייה ברוטב יפני מסורתי ובצל ירוק.",
        price: 38,
        image: "/media/menu/menu-yakitori-salmon.jpg",
      },
      {
        name: "יקיטורי פרגית (2 יח׳)",
        desc: "נתחי עוף על מקל, צלייה ברוטב יפני מסורתי ובצל ירוק.",
        price: 32,
        image: "/media/menu/menu-yakitori-chicken.jpg",
      },
      {
        name: "יקיטורי פטריית קינג אויסטר (2 יח׳)",
        desc: "פטריות על מקל, צלייה ברוטב יפני מסורתי ובצל ירוק.",
        price: 27,
        image: "/media/menu/menu-yakitori-mushroom.jpg",
        tags: ["veg"],
      },
    ],
  },
  {
    id: "ramen",
    title: "ראמן",
    footnote:
      "מרכיבי הראמן מוגשים בנפרד; יש לחמם לפי ההוראות. כלול כפית חד־פעמית, ג׳ינג׳ר וצ׳ילי קריספי בצד. הראמן בסגנון צ׳ינטן — מרק צלול שמתבשל לאט לחילוץ טעמים, קליל ומאוזן.",
    items: [
      {
        name: "ראמן חזיר",
        desc: "מרק עצמות איטי, נודלס ראמן, צ׳אשו בטן חזיר, טארה מיסו יפנית, נורי, חצי ביצת ראמן, נבנו ובצל ירוק.",
        price: 72,
        image: "/media/menu/menu-ramen-pork.jpg",
        tags: ["popular"],
      },
      {
        name: "ראמן עוף",
        desc: "מרק עצמות עוף איטי, נודלס ראמן, צ׳אשו ירך עוף, טארה סויה, נורי, חצי ביצת ראמן, נבנו ובצל ירוק.",
        price: 69,
        image: "/media/menu/menu-ramen-chicken.jpg",
        tags: ["popular"],
      },
      {
        name: "ראמן טבעוני",
        desc: "מרק ירקות איטי, נודלס ראמן, צ׳אשו טופו, טארה פטריות־סויה, שמן ארומטי, נורי, שיטאקה ובצל ירוק.",
        price: 67,
        image: "/media/menu/menu-ramen-vegan.jpg",
        tags: ["veg", "popular"],
      },
      {
        name: "ראמן קציצות דגים",
        desc: "מרק דאשי עמוק, נודלס ראמן, צ׳אשו עוגת דג, טארה סויה, שמן ארומטי, נורי, חצי ביצת ראמן, עגבניה מיובשת ובצל ירוק.",
        price: 76,
        image: "/media/menu/menu-ramen-fish.jpg",
      },
    ],
  },
  {
    id: "sushi-io",
    title: "סושי אינסייד אאוט (I/O)",
    footnote:
      "מכל שתי מנות סושי מוגש סט רטבים (ג׳ינג׳ר, וואסאבי, סויה, מיונז חריף, טריאקי). רטבים נוספים בתשלום.",
    items: [
      {
        name: "סלמון טריאקי",
        desc: "סלמון אפוי, אבוקדו, מלפפון, מיונז חריף, פירורי טמפורה וטריאקי.",
        price: 54,
        image: "/media/menu/menu-io-03.jpg",
      },
      {
        name: "טופו רול",
        desc: "טופו טמפורה, קמפיו, מלפפון, אבוקדו, צ׳יפס סלק קריספי ובצל ירוק.",
        price: 52,
        image: "/media/menu/menu-io-02.jpg",
        tags: ["veg"],
      },
      {
        name: "קראנצ׳י בטטה",
        desc: "בטטה טמפורה, אבוקדו, קמפיו, מלפפון, צ׳יפס בטטה קריספי, טריאקי ובצל ירוק.",
        price: 49,
        image: "/media/menu/menu-io-01.jpg",
        tags: ["veg"],
      },
      {
        name: "ספייסי סלמון",
        desc: "טרטר סלמון חריף, אבוקדו, מלפפון, בצל ירוק וצ׳יפס בטטה קריספי.",
        price: 59,
        image: "/media/menu/menu-io-06.jpg",
        tags: ["spicy"],
      },
      {
        name: "פיש קראנצ׳י",
        desc: "דג לבן בטמפורה, מלפפון, אבוקדו, תערובת שומשום, בצל ירוק ואיולי יוזו.",
        price: 56,
        image: "/media/menu/menu-io-05.jpg",
      },
      {
        name: "קלאסיק",
        desc: "סלמון, מלפפון, אבוקדו ותערובת שומשום.",
        price: 54,
        image: "/media/menu/menu-io-04.jpg",
      },
      {
        name: "קריספי שרימפס",
        desc: "שרימפס טמפורה, דג לבן, אבוקדו, מלפפון וצ׳יפס סלק קריספי.",
        price: 64,
        image: "/media/menu/menu-io-09.jpg",
      },
      {
        name: "פילי סטייל",
        desc: "סלמון, גבינת פילדלפיה, אבוקדו, עטיפת סלמון צרובה בלהבה ופירורי טמפורה.",
        price: 62,
        image: "/media/menu/menu-io-08.jpg",
      },
      {
        name: "דיפ פרייד",
        desc: "רול סלמון ואבוקדו מטוגן בשלמותו בטמפורה ופנקו, איולי יוזו, טריאקי, בצל ירוק ושומשום.",
        price: 62,
        image: "/media/menu/menu-io-07.jpg",
      },
      {
        name: "טריפל פיש",
        desc: "טרטר סלמון, דג לבן, אבוקדו, קמפיו, עטיפת טונה אדומה, יוזו קושו ופונזו הדרים.",
        price: 69,
        image: "/media/menu/menu-io-13.jpg",
      },
      {
        name: "סאצ׳י רול",
        desc: "סלמון, אבוקדו, מלפפון, עטיפת סלמון צרובה, צ׳יפס בטטה, מיונז חריף, טריאקי, בצל ירוק וטמפורה.",
        price: 66,
        image: "/media/menu/menu-io-12.jpg",
      },
      {
        name: "ספייסי טונה & מיסו",
        desc: "טרטר טונה חריף, אבוקדו, מלפפון, פירורי טמפורה, בצל ירוק ואיולי מיסו־הדרים.",
        price: 64,
        image: "/media/menu/menu-io-10.jpg",
        tags: ["spicy", "popular"],
      },
    ],
  },
  {
    id: "combos",
    title: "קומבינציות",
    items: [
      {
        id: "combo-raw",
        name: "קומבינציית Raw",
        description: "מבחר רולים וניגירי",
        desc: "רול טונה חריף, מאקי סלמון ואבוקדו, ניגירי טונה אדומה.",
        price: 189,
        image: "/media/menu/menu-combo-raw.jpg",
        comboItems: [
          { rollId: "io-10" },
          { rollId: "maki-salmon-avocado" },
          { rollId: "nigiri-whitefish" },
        ],
      },
      {
        id: "combo-crunch",
        name: "קומבינציית Crunch",
        description: "מבחר רולים וניגירי",
        desc: "סלמון טריאקי, פיש קראנצ׳י, מאקי סלמון אפוי ובצל ירוק, ניגירי צרוב בחמאה חומה.",
        price: 169,
        image: "/media/menu/menu-combo-crunch.jpg",
        comboItems: [
          { rollId: "io-03" },
          { rollId: "io-05" },
          { rollId: "maki-baked-salmon-scallion" },
          { rollId: "nigiri-aburi" },
        ],
      },
      {
        id: "combo-green",
        name: "קומבינציית Green",
        description: "מבחר רולים צמחוניים",
        desc: "קראנצ׳י בטטה, טופו רול, מאקי אבוקדו וקמפיו.",
        price: 119,
        image: "/media/menu/menu-combo-green.jpg",
        tags: ["veg"],
        comboItems: [
          { rollId: "io-01" },
          { rollId: "io-02" },
          { rollId: "maki-avocado-kanpyo" },
        ],
      },
    ],
  },
  {
    id: "maki",
    title: "מאקי",
    items: [
      {
        name: "מאקי דג לבן בטמפורה",
        desc: "6–8 יח׳ — דג לבן בטמפורה בנורי.",
        price: 36,
        image: "/media/menu/menu-maki-white-fish-tempura.jpg",
      },
      {
        name: "מאקי בטטה טמפורה ומלפפון",
        desc: "6–8 יח׳ — בטטה טמפורה ומלפפון.",
        price: 32,
        image: "/media/menu/menu-maki-sweet-potato-cucumber.jpg",
        tags: ["veg"],
      },
      {
        name: "מאקי אבוקדו וקמפיו",
        desc: "6–8 יח׳ — אבוקדו וקמפיו.",
        price: 29,
        image: "/media/menu/menu-maki-avocado-kanpyo.jpg",
        tags: ["veg"],
      },
      {
        name: "מאקי שרימפס טמפורה",
        desc: "6–8 יח׳ — שרימפס טמפורה.",
        price: 38,
        image: "/media/menu/menu-maki-shrimp-tempura.jpg",
      },
      {
        name: "מאקי ספייסי סלמון ומלפפון",
        desc: "6–8 יח׳ — סלמון חריף ומלפפון.",
        price: 38,
        image: "/media/menu/menu-maki-spicy-salmon-cucumber.jpg",
        tags: ["spicy"],
      },
      {
        name: "מאקי סלמון אפוי ובצל ירוק",
        desc: "6–8 יח׳ — סלמון אפוי ובצל ירוק.",
        price: 36,
        image: "/media/menu/menu-maki-baked-salmon-scallion.jpg",
      },
      {
        name: "מאקי ספייסי טונה ואבוקדו",
        desc: "6–8 יח׳ — טונה חריפה ואבוקדו.",
        price: 42,
        image: "/media/menu/menu-maki-spicy-tuna-avocado.jpg",
        tags: ["spicy"],
      },
      {
        name: "מאקי סלמון ואבוקדו",
        desc: "6–8 יח׳ — סלמון ואבוקדו.",
        price: 39,
        image: "/media/menu/menu-maki-salmon-avocado.jpg",
      },
    ],
  },
  {
    id: "nigiri",
    title: "ניגירי",
    items: [
      {
        name: "ניגירי סלמון (2 יח׳)",
        desc: "פרוסות דג על אורז עם גלאז סויה.",
        price: 36,
        image: "/media/menu/menu-nigiri-salmon.jpg",
      },
      {
        name: "ניגירי דג לבן (2 יח׳)",
        desc: "פרוסות דג על אורז עם גלאז סויה.",
        price: 34,
        image: "/media/menu/menu-nigiri-whitefish.jpg",
      },
      {
        name: "ניגירי אבוקדו (2 יח׳)",
        desc: "אבוקדו על אורז עם גלאז סויה.",
        price: 32,
        image: "/media/menu/menu-nigiri-avocado.jpg",
        tags: ["veg"],
      },
      {
        name: "ניגירי סלמון צרוב בחמאה (2 יח׳)",
        desc: "סלמון צרוב על אורז עם גלאז סויה.",
        price: 38,
        image: "/media/menu/menu-nigiri-aburi.jpg",
      },
    ],
  },
  {
    id: "sashimi",
    title: "סשימי",
    items: [
      {
        name: "סשימי סלמון (3 יח׳)",
        desc: "פרוסות דג נא עם גלאז סויה.",
        price: 48,
        image: "/media/menu/menu-sashimi-salmon-plate.jpg",
      },
      {
        name: "סשימי דג לבן (3 יח׳)",
        desc: "פרוסות דג נא עם גלאז סויה.",
        price: 46,
        image: "/media/menu/menu-sashimi-whitefish.jpg",
      },
    ],
  },
  {
    id: "desserts",
    title: "קינוחים",
    items: [
      {
        name: "טרמיסו סאקה",
        desc: "ביסקוויטים בטבילת סאקה, קרם מסקרפונה, שכבת שוקולד ורוטב וניל.",
        price: 44,
        image: "/media/menu/menu-dessert-tiramisu.jpg",
      },
      {
        name: "פרוזן ברולה",
        desc: "ברולה קפוא, רוטב קרמל יוזו וקשיו קלוי.",
        price: 42,
        image: "/media/menu/menu-dessert-frozen-brulee.jpg",
      },
    ],
  },
  {
    id: "sauces",
    title: "רטבים",
    footnote: "כל הרטבים ב־2 ₪ ליחידה.",
    items: [
      {
        name: "סויה ללא גלוטן",
        desc: "מנת רוטב ליחיד.",
        price: 2,
        image: "/media/menu/menu-sauce-soy-glutenfree.jpg",
      },
      {
        name: "סויה דלת נתרן",
        desc: "מנת רוטב ליחיד.",
        price: 2,
        image: "/media/menu/menu-sauce-soy-lowsodium.jpg",
      },
      {
        name: "סויה",
        desc: "מנת רוטב ליחיד.",
        price: 2,
        image: "/media/menu/menu-sauce-soy.jpg",
      },
      {
        name: "ג׳ינג׳ר",
        desc: "מנת רוטב ליחיד.",
        price: 2,
        image: "/media/menu/menu-sauce-ginger.jpg",
      },
      {
        name: "ספייסי מיונז",
        desc: "מנת רוטב ליחיד.",
        price: 2,
        image: "/media/menu/menu-sauce-spicy-mayo.jpg",
      },
      {
        name: "טריאקי",
        desc: "מנת רוטב ליחיד.",
        price: 2,
        image: "/media/menu/menu-sauce-teriyaki.jpg",
      },
      {
        name: "קריספי צ׳ילי",
        desc: "מנת רוטב ליחיד.",
        price: 2,
        image: "/media/menu/menu-sauce-chili-crisp.jpg",
      },
      {
        name: "ג׳ינג׳ר שום",
        desc: "מנת רוטב ליחיד.",
        price: 2,
        image: "/media/menu/menu-sauce-ginger-garlic.jpg",
      },
      {
        name: "וואסאבי",
        desc: "מנת רוטב ליחיד.",
        price: 2,
        image: "/media/menu/menu-sauce-wasabi.jpg",
      },
    ],
  },
  {
    id: "alcohol",
    title: "אלכוהול",
    subsections: [
      {
        title: "דרינקים מיפן",
        footnote: "אלכוהול — למגיעים מעל גיל 18 בלבד.",
        items: [
          {
            id: "sake-umeshu",
            name: "אומשו",
            desc: "שיכר שזיפים, קיו־נו.",
            price: 39,
          },
          {
            id: "sake-yuzu",
            name: "סאקה יוזו",
            desc: "טאמנוהיקארי.",
            price: 39,
          },
          {
            id: "sake-kaze-no-mizuho",
            name: "קאזה־נו מיזוהו",
            desc: "סאקה, גונאמי.",
            price: 42,
          },
          {
            id: "sake-kairyu",
            name: "קאירויו",
            desc: "סאקה, קורוג׳ו — 180 מ״ל.",
            price: 56,
          },
          {
            id: "sake-dewazakura",
            name: "דיוואטסורו",
            desc: "סאקה, צ׳יונאמה — 300 מ״ל.",
            price: 88,
          },
        ],
      },
      {
        title: "קוקטיילים",
        items: [
          {
            id: "cocktail-apero-spritz",
            name: "אפרול שפריץ",
            desc: "אפרול, קאוה ותפוז.",
            price: 45,
          },
          {
            id: "cocktail-whiskey-sour",
            name: "וויסקי סאוור",
            desc: "וויסקי, לימון ואנגוסטורה ביטר.",
            price: 52,
          },
          {
            id: "cocktail-jasmine",
            name: "ג׳סמין",
            desc: "ג׳ין, קמפרי, אפרסק ולימון.",
            price: 49,
          },
          {
            id: "cocktail-fuji-martini",
            name: "פוג׳י מרטיני",
            desc: "וודקה, פסיפלורה ווניל.",
            price: 54,
          },
          {
            id: "cocktail-sakura",
            name: "סאקורה",
            desc: "ג׳ין, ליצ׳י, יוזו ולימון.",
            price: 49,
          },
          {
            id: "cocktail-yuzu-margarita",
            name: "יוזו מרגריטה",
            desc: "טקילה, טריפל סק ולימון.",
            price: 54,
          },
          {
            id: "cocktail-sachi-negroni",
            name: "סאצ׳י נגרוני",
            desc: "קמפרי, ג׳ין, ליקר מלון ותפוז.",
            price: 49,
          },
        ],
      },
      {
        title: "בירה",
        items: [
          {
            id: "beer-asahi",
            name: "אסהי",
            desc: "בקבוק.",
            price: 28,
          },
          {
            id: "beer-kirin",
            name: "קירין",
            desc: "בקבוק.",
            price: 32,
          },
        ],
      },
      {
        title: "יין לבן",
        items: [
          {
            id: "wine-rioja-blanco",
            name: "ריוחה בלאנקו",
            desc: "קונדה ולדמאר, ספרד (כשר).",
            priceDisplay: "29 / 139 ₪",
          },
          {
            id: "wine-pinot-grigio",
            name: "פינו גריג׳יו",
            desc: "פרינצ׳יפאטו, איטליה.",
            priceDisplay: "34 / 157 ₪",
          },
          {
            id: "wine-chenin-blanc",
            name: "שנין בלאן",
            desc: "ג׳ף קארל, צרפת.",
            priceDisplay: "39 / 172 ₪",
          },
          {
            id: "wine-chablis",
            name: "שאבלי",
            desc: "אלברט בישו, צרפת.",
            priceDisplay: "47 / 198 ₪",
          },
        ],
      },
      {
        title: "יין רוזה & מבעבע",
        items: [
          {
            id: "wine-veritale-rose",
            name: "וריטאלי רוזה",
            desc: "סאלנטו, איטליה.",
            priceDisplay: "29 / 139 ₪",
          },
          {
            id: "wine-vibracions-cava",
            name: "ויברסיונס",
            desc: "קאווה, ספרד.",
            priceDisplay: "32 / 148 ₪",
          },
        ],
      },
      {
        title: "יין אדום",
        items: [
          {
            id: "wine-primitivo",
            name: "פרימיטיבו",
            desc: "פאולו לאו, איטליה.",
            priceDisplay: "34 / 157 ₪",
          },
          {
            id: "wine-cabernet-sauvignon",
            name: "קברנה סוביניון",
            desc: "מילפיורי, איטליה.",
            priceDisplay: "39 / 172 ₪",
          },
        ],
      },
    ],
  },
  {
    id: "soft-drinks",
    title: "שתיה קלה",
    items: [
      {
        name: "ספרייט זירו | בקבוק זכוכית",
        desc: "330 מ״ל.",
        price: 14,
        image: "/media/menu/menu-drink-sprite-zero.jpg",
      },
      {
        name: "קולה זירו | בקבוק זכוכית",
        desc: "250 מ״ל.",
        price: 14,
        image: "/media/menu/menu-drink-coke-zero.jpg",
      },
      {
        name: "קוקה־קולה | בקבוק זכוכית",
        desc: "330 מ״ל.",
        price: 14,
        image: "/media/menu/menu-drink-coke.jpg",
      },
      {
        name: "נביעות זכוכית 0.5 ל׳",
        desc: "מים מינרליים טבעיים.",
        price: 13,
        image: "/media/menu/menu-drink-neviot.jpg",
      },
      {
        name: "סודה נורדיק | בקבוק זכוכית",
        desc: "250 מ״ל.",
        price: 12,
        image: "/media/menu/menu-drink-nordic-soda.jpg",
      },
      {
        name: "מי טוניק | בקבוק זכוכית",
        desc: "200 מ״ל.",
        price: 13,
        image: "/media/menu/menu-drink-tonic.jpg",
      },
      {
        name: "פרללה גדול | בקבוק זכוכית",
        desc: "מים מוגזים.",
        price: 25,
        image: "/media/menu/menu-drink-ferrarelle.jpg",
      },
    ],
  },
];

/**
 * HOOKPOINT — Central Data Store
 * Contains Products, Blog Articles, Fishing Reports, Bundle Offers, and Volume Discount tiers.
 */

const HookPointData = {
  brand: {
    name: "HookPoint",
    tagline: "Gear Up. Cast Out. Reel In.",
    subtitle: "Premium Fishing Tackle, Bait & Marine Angler Equipment",
    phone: "+91 98765 43210 (Demo Helpline)",
    email: "support@hookpoint-tackle.com",
    address: "Chennai, Tamil Nadu, India (Physical Storefront Address Configurable)",
    city: "Chennai, Tamil Nadu, India",
    workingHours: "Mon – Sat: 06:00 AM – 08:30 PM | Sun: 05:30 AM – 02:00 PM",
    socials: {
      whatsapp: "https://wa.me/919876543210?text=Hello%20HookPoint%20Team,%20I%20have%20an%20enquiry%20regarding%20fishing%20tackle",
      instagram: "https://instagram.com/hookpoint_tackle_official",
      twitter: "https://twitter.com/hookpoint_gear",
      facebook: "https://facebook.com/hookpointfishing"
    }
  },

  categories: [
    { id: "rods", name: "Fishing Rods", count: 3, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80", desc: "Surf, inshore, and deep sea high-modulus carbon rods engineered for maximum casting distance and backbone strength." },
    { id: "reels", name: "Fishing Reels", count: 3, image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80", desc: "Corrosion-resistant saltwater spinning, baitcasting, and heavy trolling reels with carbon matrix drag." },
    { id: "lines", name: "Fishing Lines", count: 2, image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=800&q=80", desc: "8X micro-braids and invisible fluorocarbon shock leaders engineered for zero water absorption and knot strength." },
    { id: "hooks", name: "Hooks and Sinkers", count: 2, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", desc: "Chemically sharpened high-carbon steel circle hooks, bullet sinkers, and float-sinker terminal kits." },
    { id: "lures", name: "Artificial Lures", count: 3, image: "https://images.unsplash.com/photo-1520690214124-2405c5217036?auto=format&fit=crop&w=800&q=80", desc: "Deep diving holographic crankbaits, topwater surface poppers, and complete multi-lure collections." },
    { id: "bait", name: "Live and Artificial Bait", count: 2, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", desc: "Aerated bait containers, vacuum-sealed preserved squid, and nocturnal attractant worm clusters." },
    { id: "tackle", name: "Tackle Boxes", count: 2, image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80", desc: "Waterproof IP67 utility organizer cases and multi-tier cantilever trays with salt-resistant latches." },
    { id: "accessories", name: "Fishing Accessories", count: 3, image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80", desc: "Complete accessories kits, amber polarized UV400 sunglasses, and digital lip grippers with precision scales." }
  ],

  products: [
    {
      id: "rod-001",
      name: "HookPoint Apex Carbon Surf Rod",
      category: "Fishing Rods",
      categorySlug: "rods",
      price: 8499,
      originalPrice: 10499,
      rating: 4.9,
      reviewsCount: 142,
      stockStatus: "In Stock",
      badge: "Best Seller",
      image: "assets/images/product-rod-001.png",
      gallery: [
        "assets/images/product-rod-001.png",
        "assets/images/product-rod-002.jpg",
        "assets/images/product-rod-003.jpg"
      ],
      shortDesc: "12ft heavy action 40T Toray carbon blank built to launch massive sinkers through punishing ocean surf.",
      description: "Crafted specifically for punishing surf casting along stormy coastal shelves and breaker zones. The Apex Carbon Surf Rod utilizes multi-directional 40-Ton Toray high-modulus carbon fibre reinforced with nano-resin matrix. Fitted with genuine saltwater-grade Fuji K-Frame anti-tangle tangle-free Alconite guides and an ergonomic non-slip shrink-tube grip.",
      specs: {
        "Length": "12 ft (3.66 m) 3-Piece",
        "Action": "Heavy Fast Action",
        "Line Rating": "25 – 50 lb Braid",
        "Lure / Sinker Weight": "100g – 250g (3.5 – 9 oz)",
        "Guides": "Fuji Alconite Stainless K-Series (9 + Tip)",
        "Reel Seat": "Fuji DPS Heavy Duty Marine Locking",
        "Blank Material": "40T Toray Nano-Carbon Matrix",
        "Rod Weight": "420g"
      },
      materials: "Japanese Toray 40T Carbon, Grade 316 Stainless Steel, High-density EVA",
      applications: "Beach Surf Casting, Pier & Jetty Fishing, Heavy Pelagic Shore Jigging",
      features: [
        "Reinforced spigot joints with alignment locator dots",
        "Anti-tangle tip guide prevents wind knots during high-velocity casts",
        "Textured cross-carbon butt section for locked rod holder stability",
        "Includes rigid ballistic nylon travel tube with shoulder strap"
      ]
    },
    {
      id: "rod-002",
      name: "Predator Pro Inshore Spinning Rod",
      category: "Fishing Rods",
      categorySlug: "rods",
      price: 5999,
      originalPrice: 7299,
      rating: 4.8,
      reviewsCount: 89,
      stockStatus: "In Stock",
      badge: "Pro Choice",
      image: "assets/images/product-rod-002.jpg",
      gallery: [
        "assets/images/product-rod-002.jpg",
        "assets/images/product-lure-002.jpg",
        "assets/images/product-rod-001.png"
      ],
      shortDesc: "7ft 2-piece medium-fast rod tuned for twitching jerkbaits and setting hooks on explosive Barramundi.",
      description: "The Predator Pro Inshore is engineered for precision casting around mangrove roots, bridge pilings, and rocky estuaries. Boasting hyper-sensitive tip action combined with a stiff lower backbone to turn charging game fish away from structure before they slice your leader.",
      specs: {
        "Length": "7 ft (2.13 m) 2-Piece",
        "Action": "Medium-Fast",
        "Line Rating": "10 – 25 lb",
        "Lure Weight": "10g – 45g",
        "Guides": "SeaGuide Titanium-Coated Zirconia",
        "Reel Seat": "Custom Skeleton Touch Blank Seat",
        "Blank Material": "30T + 36T Hybrid Carbon",
        "Rod Weight": "148g"
      },
      materials: "36T Carbon, Carbon-woven handle, AAA Grade Portuguese Cork",
      applications: "Estuary Casting, Mangrove Snag Fishing, Inshore Lure Twitching",
      features: [
        "Featherlight blank allows all-day twitching with zero wrist fatigue",
        "Direct-touch reel seat exposes blank for detecting subtle nibbles",
        "Corrosion-tested in continuous 500-hour salt spray chambers"
      ]
    },
    {
      id: "rod-003",
      name: "TidalWave Telescopic Travel Rod",
      category: "Fishing Rods",
      categorySlug: "rods",
      price: 3799,
      originalPrice: 4499,
      rating: 4.7,
      reviewsCount: 64,
      stockStatus: "In Stock",
      badge: "Compact Travel",
      image: "assets/images/product-rod-003.jpg",
      gallery: [
        "assets/images/product-rod-003.jpg",
        "assets/images/product-rod-002.jpg",
        "assets/images/product-lure-002.jpg"
      ],
      shortDesc: "8.5ft collapsible carbon travel rod that packs down to 52cm, ready for motorcycle or airline adventures.",
      description: "Never miss an opportunistic cast on your coastal travels. The TidalWave combines telescopic portability with true multi-piece casting action. Each carbon section locks securely with zero rattle, providing the sensitivity of a 2-piece rod in a pack-friendly profile.",
      specs: {
        "Length": "8.5 ft (2.60 m) Collapses to 52cm",
        "Action": "Medium Heavy",
        "Line Rating": "15 – 30 lb",
        "Lure Weight": "20g – 80g",
        "Guides": "Reinforced Ceramic Ring Guides",
        "Weight": "210g"
      },
      materials: "High-density 24T Carbon Composite, Aluminum Lock Nut",
      applications: "Travel Expeditions, Motorcycle Coastal Scouting, Kayak Fishing",
      features: [
        "Collapses down to 52 cm to slide effortlessly into backpacks",
        "Hard protective guide-cap shields ceramic rings in transit",
        "Machined aluminum butt-cap with drainage ports"
      ]
    },
    {
      id: "reel-001",
      name: "Kraken 5000 Saltwater Spinning Reel",
      category: "Fishing Reels",
      categorySlug: "reels",
      price: 7299,
      originalPrice: 8999,
      rating: 4.9,
      reviewsCount: 210,
      stockStatus: "In Stock",
      badge: "Best Seller",
      image: "assets/images/product-reel-001.png",
      gallery: [
        "assets/images/product-reel-001.png",
        "assets/images/product-reel-002.jpg",
        "assets/images/product-reel-003.png"
      ],
      shortDesc: "IPX6 fully sealed spinning reel packing 15kg triple carbon drag to tame high-speed offshore predators.",
      description: "Forged to survive punishing saltwater immersion. The Kraken 5000 features IPX6 hydro-seal protection across the body, rotor, and spool shaft, stopping salt crystals from degrading internal gears. Powered by CNC cut brass drive gears and an oversized carbon washer stack.",
      specs: {
        "Size": "5000 Series",
        "Gear Ratio": "5.7:1",
        "Max Drag": "15 kg (33 lbs)",
        "Bearings": "9 + 1 Shielded Stainless Steel",
        "Line Retrieval": "98 cm per turn",
        "Braid Capacity": "PE 3.0 / 300m",
        "Weight": "415g"
      },
      materials: "Rigid Diecast Aluminum Alloy Body, Carbon Rotor, Brass Pinion",
      applications: "Offshore Jigging, Shore Casting, Heavy Mangrove Trolling",
      features: [
        "IPX6 water-resistant barrier keeps internal gearbox spotless",
        "Carbon drag matrix delivers buttery smooth startup inertia",
        "One-piece screw-in power handle with round EVA knob"
      ]
    },
    {
      id: "reel-002",
      name: "Barracuda Baitcasting Reel",
      category: "Fishing Reels",
      categorySlug: "reels",
      price: 6499,
      originalPrice: 7899,
      rating: 4.8,
      reviewsCount: 95,
      stockStatus: "In Stock",
      badge: "New Arrival",
      image: "assets/images/product-reel-002.jpg",
      gallery: [
        "assets/images/product-reel-002.jpg",
        "assets/images/product-reel-001.png",
        "assets/images/product-reel-003.png"
      ],
      shortDesc: "Dual magnetic + centrifugal braking system delivering zero-backlash skip casts into dense mangrove brush.",
      description: "Designed for tournament-level lure presentation. The Barracuda baitcaster features a 20-stage magnetic brake micro-dial coupled with centrifugal fly-weights to virtually eliminate bird nests even when casting into strong crosswinds.",
      specs: {
        "Gear Ratio": "7.2:1 High Speed",
        "Max Drag": "9.5 kg",
        "Bearings": "10 + 1 Double Sealed Stainless",
        "Spool": "V-Shape CNC Aircraft Aluminum Spool",
        "Weight": "198g"
      },
      materials: "Carbon Composite Frame, Titanium Line Guide",
      applications: "Precision Mangrove Casting, Topwater Twitching, Soft Plastic Jigging",
      features: [
        "Audible clicker drag alert when trophy fish make blistering runs",
        "Ceramic funnel line guide reduces friction by 28%",
        "Featherlight 198g chassis minimizes angler fatigue"
      ]
    },
    {
      id: "reel-003",
      name: "DeepDrop 8000 Big Game Trolling Reel",
      category: "Fishing Reels",
      categorySlug: "reels",
      price: 12999,
      originalPrice: 15499,
      rating: 4.9,
      reviewsCount: 42,
      stockStatus: "Low Stock",
      badge: "Heavy Duty",
      image: "assets/images/product-reel-003.png",
      gallery: [
        "assets/images/product-reel-003.png",
        "assets/images/product-reel-001.png",
        "assets/images/product-reel-002.jpg"
      ],
      shortDesc: "Machined billet aluminum big-game reel with 22kg dual lever drag for Yellowfin Tuna and King Mackerel.",
      description: "When hooked into freight-train offshore pelagics, failure is not an option. The DeepDrop 8000 is carved from solid aircraft-grade 6061-T6 aluminum with hardened stainless helical gearing.",
      specs: {
        "Gear Ratio": "4.9:1 Power Gear",
        "Max Drag": "22 kg (48.5 lbs) Dual Lever Drag",
        "Capacity": "PE 6.0 / 400m",
        "Weight": "680g"
      },
      materials: "Solid 6061-T6 Billet Aluminum, Heat-treated 17-4 Stainless Steel Gears",
      applications: "Deep Sea Trolling, Live Bait Drifting, Blue Water Pelagics",
      features: [
        "Preset drag lever with ratchet strike button and sunset max stops",
        "Loud brass clicker with stainless spring mechanism",
        "Massive cold-forged aluminum power handle"
      ]
    },
    {
      id: "line-001",
      name: "AquaShield 8X Braided Line (300m)",
      category: "Fishing Lines",
      categorySlug: "lines",
      price: 1499,
      originalPrice: 1899,
      rating: 4.9,
      reviewsCount: 312,
      stockStatus: "In Stock",
      badge: "Best Seller",
      image: "assets/images/product-line-001.jpg",
      gallery: [
        "assets/images/product-line-001.jpg",
        "assets/images/product-line-002.png",
        "assets/images/product-acc-001.png"
      ],
      shortDesc: "High-density 8-carrier ultra-smooth PE braid with nano-wax coating for zero water absorption.",
      description: "Engineered from tightly woven Japanese micro-fibres, AquaShield 8X has an ultra-round cross-section that cuts effortlessly through water currents. The proprietary Teflon-infused coating enhances abrasion resistance against jagged barnacles.",
      specs: {
        "Length": "300 Meters",
        "Strength Test": "30 lb (13.6 kg) / PE 2.5",
        "Diameter": "0.23 mm",
        "Weave": "8-Carrier Micro PE",
        "Color": "Hi-Vis Aqua Blue with 1m Gold Depth Markers"
      },
      materials: "100% Japanese Polyethylene (PE) Micro-Fibres",
      applications: "Surf Casting, Jigging, Inshore Lure Casting",
      features: [
        "Zero stretch provides instant hook-setting telegraphy",
        "Ultra-slick wax finish adds up to 15% to casting distance",
        "Depth indicator gold ticks every 10 meters for jig depth targeting"
      ]
    },
    {
      id: "line-002",
      name: "GhostFluor Invisible Fluorocarbon Leader (50m)",
      category: "Fishing Lines",
      categorySlug: "lines",
      price: 899,
      originalPrice: 1199,
      rating: 4.8,
      reviewsCount: 168,
      stockStatus: "In Stock",
      badge: "Angler Essential",
      image: "assets/images/product-line-002.png",
      gallery: [
        "assets/images/product-line-002.png",
        "assets/images/product-line-001.jpg",
        "assets/images/product-hook-001.jpg"
      ],
      shortDesc: "100% pure fluorocarbon leader matching the refractive index of saltwater, virtually invisible underwater.",
      description: "When wary predators refuse to strike in gin-clear waters, GhostFluor makes your terminal tackle vanish. Boasting rock-solid shock resistance against sudden headshakes and razor-sharp gill plates.",
      specs: {
        "Length": "50 Meters Spool",
        "Test": "25 lb (11.3 kg)",
        "Diameter": "0.405 mm",
        "Material": "100% PVDF Resin",
        "Sink Rate": "High (Sinks 3x faster than nylon)"
      },
      materials: "100% Polyvinylidene Fluoride (PVDF)",
      applications: "Terminal Leader Connection, Live Bait Rigging, Rock Fishing",
      features: [
        "Refractive index matches clear ocean water (1.42)",
        "Resists razor-sharp teeth of Barracuda and Kingfish",
        "Fast sinking speed keeps your presentation in the strike zone"
      ]
    },
    {
      id: "hook-001",
      name: "Titan Forged Circle Hooks Box (50 Pcs)",
      category: "Hooks and Sinkers",
      categorySlug: "hooks",
      price: 649,
      originalPrice: 850,
      rating: 4.9,
      reviewsCount: 184,
      stockStatus: "In Stock",
      badge: "High Strength",
      image: "assets/images/product-hook-001.jpg",
      gallery: [
        "assets/images/product-hook-001.jpg",
        "assets/images/product-line-002.png",
        "assets/images/product-hook-002.png"
      ],
      shortDesc: "Chemically sharpened 3X strong black nickel circle hooks designed for automatic corner-jaw sets.",
      description: "The gold standard for catch-and-release ocean fishing. The offset point self-hooks cleanly into the corner of the predator's jaw as it turns, preventing deep gut hooking. Forged high-carbon steel wire ensures zero straightening under heavy drag.",
      specs: {
        "Quantity": "50 Hooks per Box",
        "Sizes Included": "Assorted #1/0, #2/0, #3/0, #4/0",
        "Wire Rating": "3X Forged Heavy Wire",
        "Finish": "Anti-Rust Black Nickel Coating"
      },
      materials: "Vaccum-tempered High Carbon Steel (82B)",
      applications: "Live Bait Drifting, Surf Bottom Rigging, Catfish & Cobia",
      features: [
        "True circle bend rolls automatically into corner mouth cartilage",
        "Chemically cone-cut needle points penetrate bone effortlessly",
        "Sealed waterproof pocket tackle box included"
      ]
    },
    {
      id: "hook-002",
      name: "AeroBullet Streamlined Bullet Sinkers Kit",
      category: "Hooks and Sinkers",
      categorySlug: "hooks",
      price: 499,
      originalPrice: 650,
      rating: 4.7,
      reviewsCount: 78,
      stockStatus: "In Stock",
      badge: "Eco-Coated",
      image: "assets/images/product-hook-002.png",
      gallery: [
        "assets/images/product-hook-002.png",
        "assets/images/product-hook-001.jpg",
        "assets/images/product-line-002.png"
      ],
      shortDesc: "Hydrodynamic cone sinkers with internal brass sleeve liners to prevent line chafing.",
      description: "Streamlined aerodynamic shape cuts through fierce head-winds and slides effortlessly past jagged underwater crevices and weed beds without snagging.",
      specs: {
        "Assortment": "20 Pieces (10g, 15g, 25g, 40g)",
        "Core": "Smooth Anti-Friction Brass Core Sleeve",
        "Coating": "Matte Ocean Blue Powder Coat"
      },
      materials: "High-density Marine Alloy with Brass Inner Channel",
      applications: "Texas Rigging, Inshore Bottom Bouncing, Current Drift Rigging",
      features: [
        "Non-abrasive inner brass lining protects fluorocarbon leaders",
        "Matte non-glare finish won't spook finicky trophy fish"
      ]
    },
    {
      id: "lure-001",
      name: "HydroPulse Deep Diving Crankbait",
      category: "Artificial Lures",
      categorySlug: "lures",
      price: 799,
      originalPrice: 999,
      rating: 4.9,
      reviewsCount: 156,
      stockStatus: "In Stock",
      badge: "Best Seller",
      image: "assets/images/product-lure-001.png",
      gallery: [
        "assets/images/product-lure-001.png",
        "assets/images/product-lure-003.jpg",
        "assets/images/product-hook-002.png"
      ],
      shortDesc: "14g holographic deep diver with tungsten rattle chambers emitting predator-triggering sonic vibrations.",
      description: "Reaches depths of 3.5m within three reel cranks. The HydroPulse features prism foil inserts that flash iridescent aqua and gold under low-light conditions, mimicking a wounded baitfish fleeing along drop-offs.",
      specs: {
        "Length": "85 mm",
        "Weight": "14 grams",
        "Diving Depth": "2.8 – 3.8 Meters",
        "Hooks": "Dual BKK 4X Trebles (#6)",
        "Buoyancy": "Floating on pause"
      },
      materials: "Ultra-tough ABS Plastic, Holographic Foil, Tungsten Balls",
      applications: "Estuary Trolling, Deep Channel Cranking, River Mouth Casting",
      features: [
        "Dual tungsten internal spheres transfer weight to tail on cast for 45m+ range",
        "Emits low-frequency sonic thump that draws fish out of deep timber",
        "Pre-rigged with ultra-sharp BKK saltwater trebles"
      ]
    },
    {
      id: "lure-002",
      name: "Phantom Minnow Saltwater Jerkbait",
      category: "Artificial Lures",
      categorySlug: "lures",
      price: 899,
      originalPrice: 1100,
      rating: 4.8,
      reviewsCount: 112,
      stockStatus: "In Stock",
      badge: "Tournament Grade",
      image: "assets/images/product-lure-002.jpg",
      gallery: [
        "assets/images/product-lure-002.jpg",
        "assets/images/product-lure-001.png",
        "assets/images/product-lure-003.jpg"
      ],
      shortDesc: "110mm slow-suspending jerkbait with 3D gill plates and erratic darting action on rod sweeps.",
      description: "When worked with a twitch-twitch-pause retrieve, the Phantom Minnow suspends perfectly horizontal in the water column, daring hesitant predators to strike during the idle pause.",
      specs: {
        "Length": "110 mm",
        "Weight": "17 grams",
        "Action": "Suspending / Erratic Darting",
        "Hooks": "3 x Mustad Ultrapoint Trebles (#4)"
      },
      materials: "Impact-resistant Polycarbonate, Stainless Wire-Through Construction",
      applications: "Mangrove Jack Hunting, Seabass Pier Casting, Coastal Flats",
      features: [
        "Wire-through structural backbone prevents body fractures under 10kg+ torque",
        "Lifelike 3D laser eyes with red strike trigger accent"
      ]
    },
    {
      id: "lure-003",
      name: "ViperTopwater Surface Popper",
      category: "Artificial Lures",
      categorySlug: "lures",
      price: 699,
      originalPrice: 899,
      rating: 4.9,
      reviewsCount: 92,
      stockStatus: "In Stock",
      badge: "Explosive Strikes",
      image: "assets/images/product-lure-003.jpg",
      gallery: [
        "assets/images/product-lure-003.jpg",
        "assets/images/product-lure-001.png",
        "assets/images/product-hook-002.png"
      ],
      shortDesc: "Deep cupped-mouth surface popper throwing massive water plumes and air-chugging sonic bloops.",
      description: "Nothing matches the adrenaline rush of an explosive topwater smash. The Viper Popper features an oversized concave mouth that throws water 2 feet forward on aggressive rod snaps.",
      specs: {
        "Length": "95 mm",
        "Weight": "21 grams",
        "Action": "Topwater Surface Popping / Chugger",
        "Pattern": "Mahi Gold & Bioluminescent Aqua"
      },
      materials: "High-density Polymeric Foam Resin",
      applications: "Giant Trevally Surface Foils, King Mackerel Dawn Patrols",
      features: [
        "Rear weighted balance enables laser-straight casts into stiff sea breezes",
        "Feathered rear hook creates pulsing natural swimming action"
      ]
    },
    {
      id: "bait-001",
      name: "StrikeScent Preserved Squid Strips (150g)",
      category: "Bait",
      categorySlug: "bait",
      price: 399,
      originalPrice: 500,
      rating: 4.8,
      reviewsCount: 140,
      stockStatus: "In Stock",
      badge: "Angler Choice",
      image: "assets/images/product-bait-001.png",
      gallery: [
        "assets/images/product-bait-001.png",
        "assets/images/product-bait-002.jpg",
        "assets/images/product-hook-001.jpg"
      ],
      shortDesc: "Vacuum-sealed cured squid strips infused with concentrated marine amino acids and UV glow oil.",
      description: "Tough, durable, and packed with irresistible scent trails that travel hundreds of meters in coastal currents. Cured with natural marine salts to stay locked on the hook through repeated nibbles from bait-stealers.",
      specs: {
        "Weight": "150 grams Net",
        "Shelf Life": "12 Months (No refrigeration required until unsealed)",
        "Scent Matrix": "Squid Pheromones + Betaine Amino Complex"
      },
      materials: "Natural Preserved Oceanic Squid, Food-grade Salts & Amino Extracts",
      applications: "Surf Casting, Rock Ledge Bottom Fishing, Boat Drifting",
      features: [
        "10x tougher than raw supermarket squid — stays on hook through violent casts",
        "Pre-cut into uniform streamlined tapered ribbons",
        "Resealable leak-proof ziplock pouch"
      ]
    },
    {
      id: "bait-002",
      name: "BioGlow Night Attractant Worm Clusters (12-Pack)",
      category: "Bait",
      categorySlug: "bait",
      price: 449,
      originalPrice: 599,
      rating: 4.7,
      reviewsCount: 65,
      stockStatus: "In Stock",
      badge: "Night Fishing",
      image: "assets/images/product-bait-002.jpg",
      gallery: [
        "assets/images/product-bait-002.jpg",
        "assets/images/product-bait-001.png",
        "assets/images/product-hook-001.jpg"
      ],
      shortDesc: "Bioluminescent glow-in-the-dark artificial ragworm clusters charged by UV light.",
      description: "Charge with your torch for 20 seconds to emit a soft aqua-green bioluminescent glow that mimics distressed deep-water polychaete marine worms.",
      specs: {
        "Quantity": "12 Clusters per Pack",
        "Glow Duration": "Up to 45 minutes per charge",
        "Scent": "Infused Crab & Mussel Paste"
      },
      materials: "Biodegradable Hydrogel Polymer",
      applications: "Night Pier Fishing, Mud Flat Night Stalking, Murky Estuary Bottoms",
      features: [
        "Eco-friendly 100% biodegradable formulation safe for marine ecosystems",
        "Super supple wiggling action in the mildest current"
      ]
    },
    {
      id: "tackle-001",
      name: "Waterproof Seal Armor 4-Tray Tackle Box",
      category: "Tackle Boxes",
      categorySlug: "tackle",
      price: 2899,
      originalPrice: 3499,
      rating: 4.9,
      reviewsCount: 118,
      stockStatus: "In Stock",
      badge: "Staff Pick",
      image: "assets/images/product-tackle-001.png",
      gallery: [
        "assets/images/product-tackle-001.png",
        "assets/images/product-tackle-002.jpg",
        "assets/images/product-acc-001.png"
      ],
      shortDesc: "IP67 submersible tackle trunk with silicone O-ring gasket and rust-proof stainless steel cam latches.",
      description: "Built to survive getting swamped in beach surf or dropped on boat decks. Features thick shock-resistant polypropylene walls, 4 pull-out cantilever organizing trays with customizable slot dividers, and a spacious deep bottom well.",
      specs: {
        "Dimensions": "42 x 26 x 22 cm",
        "Trays": "4 Cantilever Smooth-Fold Trays",
        "Waterproof Rating": "IP67 (Submersible / Floating)",
        "Weight": "1.8 kg"
      },
      materials: "High-impact Polypropylene, 316 Stainless Steel Pin Hinges, Silicone O-Ring",
      applications: "Boat Storing, Pier Organization, Multi-species Mobile Angling",
      features: [
        "Floats when dropped into open water even when loaded with up to 5kg of gear",
        "Integrated measuring ruler etched on the lid (up to 40cm)",
        "Includes 32 customizable modular divider compartments"
      ]
    },
    {
      id: "tackle-002",
      name: "MarineRig Double-Sided Utility Organizer Case",
      category: "Tackle Boxes",
      categorySlug: "tackle",
      price: 1299,
      originalPrice: 1599,
      rating: 4.8,
      reviewsCount: 84,
      stockStatus: "In Stock",
      badge: "Pocket Utility",
      image: "assets/images/product-tackle-002.jpg",
      gallery: [
        "assets/images/product-tackle-002.jpg",
        "assets/images/product-tackle-001.png",
        "assets/images/product-lure-003.jpg"
      ],
      shortDesc: "Slimline double-sided lure box with V-groove slots that cradle trebles without tangling.",
      description: "Slides into your fishing vest or sling pack. The staggered dual-sided V-slots comfortably accommodate 14 hard minnows and crankbaits, with dedicated drainage vents to dry wet lures after use.",
      specs: {
        "Capacity": "14 Lures up to 120mm",
        "Dimensions": "20 x 13 x 3.8 cm",
        "Drainage": "Dual micro-slot evaporation ports"
      },
      materials: "Clear Smoke Anti-UV Polycarbonate",
      applications: "Wading, Kayak Fishing, Shore Stalking",
      features: [
        "Smoke-tinted UV filter stops sun degradation of lure paints",
        "Drain vents allow you to rinse salt out with freshwater without removing lures"
      ]
    },
    {
      id: "acc-001",
      name: "Titanium Anodized Braid Cutters & Pliers",
      category: "Fishing Accessories",
      categorySlug: "accessories",
      price: 1799,
      originalPrice: 2299,
      rating: 4.9,
      reviewsCount: 230,
      stockStatus: "In Stock",
      badge: "Best Seller",
      image: "assets/images/product-acc-001.png",
      gallery: [
        "assets/images/product-acc-001.png",
        "assets/images/product-acc-003.jpg",
        "assets/images/product-line-001.jpg"
      ],
      shortDesc: "CNC aluminum saltwater pliers with replaceable tungsten carbide cutters and split-ring nose.",
      description: "An angler's most vital tool. Slices through 80lb braided line cleanly like butter without fraying. Features split-ring opening beak, crimping indentations for heavy leaders, and an elastic coiled lanyard with belt sheath.",
      specs: {
        "Length": "19 cm (7.5 in)",
        "Cutters": "Tungsten Carbide Replaceable Anvil Cutters",
        "Weight": "135g Ultra-lightweight",
        "Includes": "Molded nylon belt sheath & steel-core coiled lanyard"
      },
      materials: "Aircraft Grade 6061-T6 Aluminum, Tungsten Carbide",
      applications: "Hook Removal, Split Ring Swaps, Braid Cutting, Leader Crimping",
      features: [
        "100% rust-proof in saltwater environments",
        "Spring-loaded handles allow effortless one-handed operation while holding a fish",
        "Lanyard clips securely to belt loops to prevent accidental sea drops"
      ]
    },
    {
      id: "acc-002",
      name: "HookPoint Polarized Ocean Sunglasses",
      category: "Fishing Accessories",
      categorySlug: "accessories",
      price: 2499,
      originalPrice: 3199,
      rating: 4.8,
      reviewsCount: 96,
      stockStatus: "In Stock",
      badge: "Vision Tech",
      image: "assets/images/product-acc-002.jpg",
      gallery: [
        "assets/images/product-acc-002.jpg",
        "assets/images/product-rod-002.jpg",
        "assets/images/product-rod-003.jpg"
      ],
      shortDesc: "Amber mirrored TAC polarized lenses that cut surface ocean glare to reveal submerged structures and cruising game fish.",
      description: "Spot fish before they see you. Specifically tuned for spotting cruising game fish in flats and shallow reefs. TAC 7-layer polarization cuts 99.8% of harsh water glare while boosting underwater contrast and clarity.",
      specs: {
        "Lens Type": "7-Layer Triacetate Cellulose (TAC) Polarized",
        "UV Protection": "UV400 100% UVA/UVB Block",
        "Frame": "Flexible TR90 Memory Polymer",
        "Lens Color": "Amber Base with Gold-Aqua Mirror Coating"
      },
      materials: "Swiss TR90 Polymer, Oleophobic Hydrophobic Lens Coating",
      applications: "Sight Fishing, Flats Stalking, Offshore Boat Piloting",
      features: [
        "Hydrophobic coating repels sea spray, water droplets and smudges",
        "Non-slip rubberized temple tips stay glued to face during active casting",
        "Includes hard protective zip-case and microfiber cleaning bag"
      ]
    },
    {
      id: "acc-003",
      name: "GripLock Digital Scale & Fish Lip Gripper",
      category: "Fishing Accessories",
      categorySlug: "accessories",
      price: 1699,
      originalPrice: 2199,
      rating: 4.8,
      reviewsCount: 88,
      stockStatus: "In Stock",
      badge: "Catch & Release",
      image: "assets/images/product-acc-003.jpg",
      gallery: [
        "assets/images/product-acc-003.jpg",
        "assets/images/product-acc-001.png",
        "assets/images/product-tackle-001.png"
      ],
      shortDesc: "Stainless steel rotating jaw lip gripper with backlit digital scale accurate up to 25kg / 55lbs.",
      description: "Safely land, secure, weigh, and release trophy fish without harming their protective slime coat or straining their jaw cartilage. The 360-degree rotating swivel handle neutralizes fish thrashing.",
      specs: {
        "Capacity": "25 kg (55 lbs) with 20g resolution",
        "Display": "Backlit Blue LCD with Unit Switch (kg / lb / oz)",
        "Battery": "2 x AAA Included",
        "Tape Measure": "Built-in 100cm retractable ruler"
      },
      materials: "Marine Stainless Steel 304, Non-slip Rubber Grip",
      applications: "Safe Fish Handling, Tournament Weighing, Trophy Documentation",
      features: [
        "360° rotating handle turns smoothly with thrashing fish",
        "Auto-hold memory locks peak weight automatically",
        "Waterproof silicone button seals survive heavy rainfall"
      ]
    }
  ],

  blogPosts: [
    {
      id: "blog-007",
      title: "Coastal Rock Fishing Tactics: Reading Swells, Burley Trails & Rod Selection",
      category: "Fishing Techniques",
      categorySlug: "techniques",
      excerpt: "Master the art of reading wave hydraulics, establishing a continuous burley slick, and picking abrasion-resistant shock leaders that survive jagged ledges.",
      author: {
        name: "Arjun Varma",
        role: "Master Rock Angler & Ledge Specialist",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
      },
      date: "October 12, 2026",
      readTime: "8 min read",
      image: "assets/images/blog-card-1.jpg",
      content: `
        <p class="lead">Ocean rock ledges are magnets for trophy pelagics and bottom brawlers. The crashing surf aerates the water and dislodges crustaceans, drawing in Giant Trevally, Barramundi, and Snapper right to your feet.</p>

        <h3>1. Establishing an Effective Burley Trail</h3>
        <p>On exposed ledges, fish are opportunistic. A continuous burley slick made of crushed oil sardines, bran, and fish oil creates a scent highway that pulls predators up from deep structure into casting range.</p>

        <div class="my-6 p-5 rounded-xl border border-ocean-aqua/30 bg-ocean-navy-surface/80">
          <h4 class="text-ocean-aqua font-bold text-lg mb-2">Ledge Safety Directive</h4>
          <p class="text-sm text-ocean-text-secondary">Always wear steel-spiked rock boots and a compact inflatable PFD. Spend at least 20 minutes observing the swell sets before stepping onto any wet rock platform.</p>
        </div>

        <h3>2. Abrasion-Resistant Terminal Setup</h3>
        <p>Barnacle-encrusted granite will shear standard monofilament in a heartbeat. Use a minimum of 60lb to 80lb tough fluorocarbon wind-on leaders and chemically sharpened 4X strong circle hooks.</p>

        <h3>3. Playing Fish Around Submerged Structure</h3>
        <p>When a pelagic takes your bait and dives for bottom crevices, keep your rod tip high and apply heavy drag immediately. Letting fish take line near wash zones guarantees cutoffs on razor-sharp reef oysters.</p>
      `
    },
    {
      id: "blog-001",
      title: "The Ultimate Guide to Surf Fishing in Heavy Currents",
      category: "Fishing Techniques",
      categorySlug: "techniques",
      excerpt: "Master the art of reading rip currents, choosing aerodynamic pyramid sinkers, and launching beyond breaking breakers.",
      author: {
        name: "Capt. Rajesh Nair",
        role: "Chief Coastal Guide",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
      },
      date: "October 10, 2026",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1601226041388-8bbabdd6e37e?auto=format&fit=crop&w=1200&q=80",
      content: `
        <p class="lead">Surf fishing is the purest form of marine angling: standing waist-deep in the surging Indian Ocean foam, reading the hydraulic contours of the beach, and launching a heavy payload into the feeding trench beyond the breaker bar.</p>
        
        <h3>1. Reading the Surf: Finding the Gut and Rip Currents</h3>
        <p>Ninety percent of fish in the surf swim in ten percent of the water. To consistently connect with fish, you must identify underwater topography. Look for darker, calmer patches between white foamy crashing breakers. These darker channels are "guts" or depressions carved by outbound water — highways where Barramundi, Threadfin Salmon, and Pompano cruise to intercept dislodged crabs and baitfish.</p>
        
        <div class="my-6 p-5 rounded-xl border border-ocean-aqua/30 bg-ocean-navy-surface/80">
          <h4 class="text-ocean-aqua font-bold text-lg mb-2">Angler Pro Tip</h4>
          <p class="text-sm text-ocean-text-secondary">Arrive at your chosen beach at dead low tide. Take photos of exposed sandbars, deep holes, and submerged rocky patches. When the water returns on the rising tide, you will know exactly where the ambushing predators are waiting.</p>
        </div>

        <h3>2. Selecting the Right Terminal Tackle</h3>
        <p>In high-current situations, conventional round sinkers will simply roll across the ocean floor and wash up at your feet within ninety seconds. You need specialized hardware:</p>
        <ul class="list-disc list-inside space-y-2 mb-4 text-ocean-text-secondary">
          <li><strong>Pyramid and Spider Sinkers:</strong> The flat faces of pyramid weights bite into shifting sand, holding your bait firmly in the strike zone. In extreme 3-knot tidal rips, wire-armed spider sinkers are indispensable.</li>
          <li><strong>High-Low Dropper Rigs:</strong> Keeping two baits suspended at different heights off the bottom prevents crab scavengers from devouring your bait before pelagic cruisers spot it.</li>
          <li><strong>Abrasion-Resistant Shock Leaders:</strong> Heavy surf churns abrasive sand particles that quickly weaken standard line. Use at least 40lb to 50lb fluorocarbon shock leaders.</li>
        </ul>

        <h3>3. Timing the Tides</h3>
        <p>The two hours leading up to high tide and the first hour after the tide turns represent the peak feeding window. As incoming waves flood over dry sand, they wash out sand fleas, small crabs, and seaworms, triggering aggressive opportunistic feeding.</p>
      `
    },
    {
      id: "blog-002",
      title: "Topwater vs Deep Diving Lures: When to Throw What",
      category: "Bait and Lure Guides",
      categorySlug: "lures",
      excerpt: "Demystifying water column dynamics to help you trigger explosive surface smashes or extract stubborn bottom lurkers.",
      author: {
        name: "Vikram Sengupta",
        role: "Tournament Pro Angler & Lure Designer",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
      },
      date: "October 04, 2026",
      readTime: "6 min read",
      image: "assets/images/blog-card-2.png",
      content: `
        <p class="lead">Every angler dreams of a monstrous fish leaping completely out of the water to inhale a surface popper. But choosing between topwater poppers and deep-diving crankbaits shouldn't be based on excitement alone — it's a science of depth, light, and predator energy.</p>

        <h3>When to Throw Topwater</h3>
        <p>Surface presentations are most effective during low-light transitions: dawn, dusk, and heavily overcast days. When the sun is below the horizon, predators feel secure roaming shallow flats and upper water layers without fear of birds of prey.</p>
        <p>Use topwater walking baits and poppers when:</p>
        <ul class="list-disc list-inside space-y-2 mb-4 text-ocean-text-secondary">
          <li>Water surface is glassy or exhibits a light ripple.</li>
          <li>You observe baitfish flicking or skipping on the surface.</li>
          <li>Fishing over shallow submerged reef flats where deep hooks would snag.</li>
        </ul>

        <h3>When to Switch to Deep Divers</h3>
        <p>As soon as high noon approaches and the sun pierces down into the ocean, game fish retreat into deep shade, structure, and temperature thermoclines. If you continue casting topwater in bright sunlight, you will go home empty-handed.</p>
        <p>Deep-diving crankbaits with oversized polycarbonate diving lips reach 3 to 5 meters down, deflecting off sunken rocks and triggering reactionary strikes from dormant predators who won't budge for surface lures.</p>
      `
    },
    {
      id: "blog-003",
      title: "Beginner Angler Roadmap: First 5 Tackle Items You Actually Need",
      category: "Beginner Fishing Guides",
      categorySlug: "beginner",
      excerpt: "Cut through tackle shop clutter. Avoid buying useless accessories and invest in the essential gear that lands fish.",
      author: {
        name: "Pooja Fernandez",
        role: "Youth & Inshore Instructor",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
      },
      date: "September 28, 2026",
      readTime: "5 min read",
      image: "assets/images/blog-card-3.jpg",
      content: `
        <p class="lead">Walking into a massive tackle shop for the first time can feel overwhelming. Walls lined with hundreds of gleaming lures, dozens of rods, and confusing ratings often lead beginners to waste money on the wrong equipment.</p>

        <h3>The Essential 5-Piece Arsenal</h3>
        <ol class="list-decimal list-inside space-y-3 mb-6 text-ocean-text-secondary">
          <li><strong>A Versatile 7ft Medium-Action Spinning Combo:</strong> A 7ft rod paired with a 3000 or 4000-size reel is the Swiss Army knife of fishing. It can cast lightweight lures in backwaters and handle medium bait setups from the pier.</li>
          <li><strong>High-Quality 20lb Braided Main Line:</strong> Avoid cheap monofilament that develops coils like a slinky. Braid gives you incredible sensitivity and thin diameter for greater casting range.</li>
          <li><strong>A Spool of 20lb Fluorocarbon Leader:</strong> Fish have sharp eyes. Tying 4 feet of fluorocarbon to your braid makes your line vanish underwater and shields against sharp rocks.</li>
          <li><strong>Assorted Box of 2/0 and 3/0 Circle Hooks:</strong> Circle hooks do the work for you. When a fish takes the bait, you don't even need a violent bass-master hook set — simply reel tight!</li>
          <li><strong>A Reliable Pair of Braid Scissors / Saltwater Pliers:</strong> Braid cannot be cleanly cut with your teeth or dull pocketknives. Proper pliers keep your fingers safe from sharp thrashing hooks.</li>
        </ol>
      `
    },
    {
      id: "blog-004",
      title: "Saltwater Reel Maintenance: Preserving Bearings from Corrosion",
      category: "Equipment Care",
      categorySlug: "equipment",
      excerpt: "Simple 5-minute post-fishing cleaning rituals that prevent saltwater pitting and keep your drags silky smooth for decades.",
      author: {
        name: "Dinesh Karthik",
        role: "Head Reel Technician & Saltwater Specialist",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80"
      },
      date: "September 22, 2026",
      readTime: "8 min read",
      image: "assets/images/blog-card-4.jpg",
      content: `
        <p class="lead">Saltwater is the natural predator of precision machinery. Evaporating ocean spray leaves behind microscopic sodium chloride crystals that act like sandpaper inside your ball bearings. Here is how to keep your investment running like new.</p>

        <h3>The Golden Rule: Never Blast Your Reel with High-Pressure Hoses</h3>
        <p>The most common mistake amateur anglers make is taking a garden hose nozzle on full blast and spraying directly into the reel body. High-pressure water forces salt brine past rubber seals directly into the inner gear chamber, creating trapped moisture pockets that destroy bearings within weeks.</p>

        <h3>The 4-Step Rinsing Method</h3>
        <ul class="list-disc list-inside space-y-2 mb-4 text-ocean-text-secondary">
          <li><strong>Step 1: Tighten Drag Fully:</strong> Before water touches your reel, tighten the drag star or knob completely. This compresses the carbon washers together, preventing water from penetrating between the drag discs.</li>
          <li><strong>Step 2: Gentle Mist Shower:</strong> Use a spray bottle or a gentle shower mist setting. Hold the reel upside down so gravity pulls water away from the main shaft.</li>
          <li><strong>Step 3: Wipe Down with Microfiber:</strong> Dry the exterior thoroughly, paying close attention to the line roller bearing and bail arm hinges.</li>
          <li><strong>Step 4: Back Off the Drag:</strong> Loosen the drag completely before storing the reel. Leaving a drag compressed under high pressure for months flattens the washers and ruins its smooth startup curve.</li>
        </ul>
      `
    },
    {
      id: "blog-005",
      title: "Reading the Tides: How Solunar Phases Dictate Feeding Windows",
      category: "Seasonal Fishing Tips",
      categorySlug: "seasonal",
      excerpt: "Aligning your fishing calendar with the lunar gravitational pull to target trophy fish when feeding urgency peaks.",
      author: {
        name: "Dr. Meera Nambiar",
        role: "Marine Biologist & Coastal Oceanographer",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
      },
      date: "September 15, 2026",
      readTime: "6 min read",
      image: "assets/images/blog-card-5.jpg",
      content: `
        <p class="lead">Marine predators do not check watches; their internal feeding clocks are dictated by the gravitational pull of the moon and the volume of water moving across shallow continental shelves.</p>

        <h3>Spring Tides vs Neap Tides</h3>
        <p>During the Full Moon and New Moon, the sun, moon, and earth align in a direct line. This gravitational alignment creates "Spring Tides" — marked by the highest high tides and the lowest low tides of the month. Massive volumes of water move rapidly, dislodging crabs, prawns, and small schooling fish.</p>
        <p>Conversely, during the Quarter Moon phases, gravitational pulls counteract each other, resulting in sluggish "Neap Tides". Understanding this rhythm allows you to pick the right days to fish before leaving home.</p>
      `
    },
    {
      id: "blog-006",
      title: "Essential Ocean Safety: Life Jackets, Wave Reading & Reef Navigation",
      category: "Fishing Safety",
      categorySlug: "safety",
      excerpt: "Never turn your back on the sea. Critical survival knowledge for rock fishers, surf waders, and boaters.",
      author: {
        name: "Karan Singhania",
        role: "Offshore Rescue Specialist & Marine Safety Officer",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
      },
      date: "September 08, 2026",
      readTime: "7 min read",
      image: "assets/images/blog-card-6.png",
      content: `
        <p class="lead">The ocean is majestic and bountiful, but it can turn treacherous in seconds. Every year, passionate anglers lose gear, get swept off rocks, or find themselves stranded in sudden rip currents. Safety is not optional — it is your most important piece of gear.</p>

        <h3>Rock Fishing Safety Checklist</h3>
        <ul class="list-disc list-inside space-y-2 mb-4 text-ocean-text-secondary">
          <li><strong>Never Fish Alone:</strong> Coastal ledges are slippery and unpredictable. Always fish with a buddy who can call emergency services or throw a flotation device.</li>
          <li><strong>Cleated Footwear:</strong> Wet algae on granitic rocks is slicker than ice. Invest in specialized spiked rock boots with tungsten carbide studs.</li>
          <li><strong>Wear an Inflatable PFD:</strong> Modern manual/automatic inflatable life jackets are slim, lightweight, and do not restrict casting movement. If you are swept into turbulent aerated whitewater, a PFD is your only lifeline.</li>
          <li><strong>Observe Before Stepping Down:</strong> Spend at least 20 minutes watching the sea swell before stepping onto an exposed rock platform. Rogue wave sets often come in groups every 15 to 20 minutes.</li>
        </ul>
      `
    }
  ],

  fishingReports: [
    {
      id: "report-001",
      location: "Mangalore Coastal Outcrop & Netravati Estuary",
      region: "Karnataka Coastline",
      waterType: "Estuary / River Mouth",
      coordinates: "12.8421° N, 74.8329° E",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      waterTemp: "28°C (82.4°F)",
      waveHeight: "1.1m (Moderate Breakers)",
      tideStatus: "Rising Tide (+1.4m Peak at 16:30)",
      wind: "11 kts WSW",
      visibility: "Clear (4.2m underwater)",
      activityRating: "4.9 / 5 Peak",
      species: ["Barramundi (Asian Seabass)", "Mangrove Jack", "Giant Trevally (GT)", "Threadfin Salmon"],
      recommendedBait: "StrikeScent Preserved Squid Strips & 14g HydroPulse Deep Crankbait",
      proTip: "Target the granitic submerged boulder line 45 minutes before high slack tide. Slow rolling twitch jerkbaits along the current seam has yielded multiple 6kg+ Barramundi this week.",
      updatedAt: "Updated 2 hours ago (Simulated Demo)"
    },
    {
      id: "report-002",
      location: "Goa Chapora River Mouth & Vagator Shelf",
      region: "North Goa",
      waterType: "Surf / Beach",
      coordinates: "15.6042° N, 73.7381° E",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      waterTemp: "29°C (84.2°F)",
      waveHeight: "0.8m (Gentle Swell)",
      tideStatus: "High Slack Tide (Transitioning to Ebb)",
      wind: "8 kts NW",
      visibility: "Very Clear (6.0m)",
      activityRating: "4.7 / 5 High",
      species: ["Ladyfish (Kane)", "Queenfish", "Golden Snapper", "Bluefin Trevally"],
      recommendedBait: "BioGlow Night Worm Clusters & Phantom Minnow 110mm Jerkbait",
      proTip: "Ladyfish schooling heavily along the sandy drop-offs. Use small #1/0 circle hooks with light 10lb fluorocarbon leaders for consistent hookups.",
      updatedAt: "Updated 4 hours ago (Simulated Demo)"
    },
    {
      id: "report-003",
      location: "Chennai Marina Breakers & Pulicat Lake Inlets",
      region: "Tamil Nadu Coast",
      waterType: "Surf / Beach",
      coordinates: "13.0475° N, 80.2824° E",
      image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=800&q=80",
      waterTemp: "30°C (86.0°F)",
      waveHeight: "1.6m (Heavy Surf)",
      tideStatus: "Ebbing Low Tide (-0.2m Low at 11:15)",
      wind: "14 kts ESE",
      visibility: "Slightly Murky (2.5m)",
      activityRating: "4.5 / 5 Steady",
      species: ["Croaker", "Mullet", "Rock Cod (Grouper)", "Pompano"],
      recommendedBait: "Apex Carbon Surf Rod with 150g Pyramid Sinker & Squid Baits",
      proTip: "Heavy breaker action requires long 12ft casts to clear the outer sandbar. Pack 40g to 50g spider sinkers to anchor against cross-shore drift.",
      updatedAt: "Updated 5 hours ago (Simulated Demo)"
    },
    {
      id: "report-004",
      location: "Mumbai Worli Seafront & Bandra Rocky Shelf",
      region: "Maharashtra Coast",
      waterType: "Rocky Cliffs",
      coordinates: "19.0176° N, 72.8174° E",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80",
      waterTemp: "27°C (80.6°F)",
      waveHeight: "1.3m (Choppy Coastal Swell)",
      tideStatus: "Incoming Flood Tide (+1.8m at 19:45)",
      wind: "13 kts W",
      visibility: "Moderate (3.0m)",
      activityRating: "4.6 / 5 High",
      species: ["Ghol (Blackspotted Croaker)", "Indian Mackerel", "Giant Seabass", "Catfish"],
      recommendedBait: "Heavy Jigs (40g) & Cured Squid ribbons with glow attractants",
      proTip: "Exercise extreme caution on slippery seawall rocks — wear studded boots. Sunset flood tide is triggering explosive strikes from feeding schools of Mackerel.",
      updatedAt: "Updated 3 hours ago (Simulated Demo)"
    },
    {
      id: "report-005",
      location: "Andaman South Trench & Havelock Outer Drop-off",
      region: "Andaman & Nicobar Islands",
      waterType: "Deep Sea / Offshore",
      coordinates: "11.9761° N, 93.0031° E",
      image: "https://images.unsplash.com/photo-1520690214124-2405c5217036?auto=format&fit=crop&w=800&q=80",
      waterTemp: "29°C (84.2°F)",
      waveHeight: "1.4m (Clean Oceanic Swell)",
      tideStatus: "Mid-Flood Tide Rising Rapidly",
      wind: "9 kts SW",
      visibility: "Crystal Oceanic (18.0m+)",
      activityRating: "5.0 / 5 World Class",
      species: ["Monster Giant Trevally (30kg+)", "Dogtooth Tuna", "Sailfish", "Wahoo"],
      recommendedBait: "ViperTopwater Surface Popper & DeepDrop 8000 Trolling Combo",
      proTip: "Giant Trevally smashing topwater poppers around reef pinnacles. Heavy 100lb leader is mandatory; anything lighter is instantly severed on coral heads.",
      updatedAt: "Updated 1 hour ago (Simulated Demo)"
    },
    {
      id: "report-006",
      location: "Vizag Dolphin's Nose Rocky Shelf & Harbour Mouth",
      region: "Andhra Pradesh Coast",
      waterType: "Rocky Cliffs",
      coordinates: "17.6833° N, 83.2833° E",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
      waterTemp: "28.5°C (83.3°F)",
      waveHeight: "1.0m (Moderate Rolling Swell)",
      tideStatus: "Slack Water (Turn of Tide at 14:00)",
      wind: "10 kts SE",
      visibility: "Good (5.0m)",
      activityRating: "4.8 / 5 High",
      species: ["Red Snapper", "Cobia", "Spanish Mackerel", "Kingfish"],
      recommendedBait: "Live Bait Dropper Rig on Titan Forged Circle Hooks",
      proTip: "Cobia cruising just 20 meters off the rocky drop-off at slack water. Drift live prawns or small mullet without sinkers for natural presentations.",
      updatedAt: "Updated 6 hours ago (Simulated Demo)"
    }
  ],

  pricingTiers: {
    gearTiers: [
      {
        tier: "Entry-Level Angler",
        badge: "Beginner Friendly",
        priceRange: "₹3,500 – ₹7,000",
        description: "Everything a beginner needs to start landing coastal fish with dependable durability.",
        includes: [
          "TidalWave Telescopic or 7ft Inshore Carbon Rod",
          "3000-size Salt-Resistant Spinning Reel",
          "300m AquaShield 8X Braided Line (20lb)",
          "50-piece Titan Circle Hook Assortment",
          "Basic terminal sinkers & starter lure pack"
        ],
        idealFor: "Weekend hobbyists, family fishing outings, beginners learning knots and casting."
      },
      {
        tier: "Weekend Explorer",
        badge: "Most Popular",
        priceRange: "₹9,500 – ₹16,500",
        description: "Tournament-inspired gear tuned for active casting, salt-spray durability, and larger game fish.",
        includes: [
          "Predator Pro 7ft or Apex Carbon Surf Rod",
          "Kraken 5000 IPX6 Saltwater Sealed Reel",
          "AquaShield 8X Braid + GhostFluor Leader",
          "3 x HydroPulse & Phantom Minnow Hard Lures",
          "Waterproof Seal Armor 4-Tray Tackle Box",
          "Titanium Braid Shears & Pliers"
        ],
        idealFor: "Enthusiast anglers targeting Barramundi, Trevally, Snapper, and surf species."
      },
      {
        tier: "Tournament & Big Game Pro",
        badge: "Master Grade",
        priceRange: "₹24,000 – ₹42,000+",
        description: "Uncompromised marine hardware designed to tame ocean freight trains like Tuna and Sailfish.",
        includes: [
          "Apex 40T Toray Nano-Carbon Surf / Jigging Rod",
          "DeepDrop 8000 Billet Aluminum Reel (22kg Drag)",
          "Heavy PE 6.0 Hollow Core Braid (400m)",
          "Titanium TAC Polarized Ocean Sunglasses",
          "GripLock 25kg Digital Fish Lip Gripper",
          "Custom Rod & Reel Calibrated Spooling Service"
        ],
        idealFor: "Charter captains, offshore expedition anglers, competitive fishing tournaments."
      }
    ],

    bundleOffers: [
      {
        id: "bundle-001",
        name: "Coastal Starter Combo Kit",
        badge: "Save 25%",
        price: 4999,
        originalPrice: 6699,
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
        tagline: "Turnkey outfit ready for estuaries, river mouths, and pier casting.",
        includes: [
          "TidalWave 8.5ft Telescopic Carbon Rod",
          "WaveRunner 3000 Saltwater Spinning Reel",
          "300m AquaShield 8X Micro-Braid (20lb)",
          "50-Pack Titan Circle Hooks + HydroSinkers",
          "Waterproof Starter Tackle Box"
        ]
      },
      {
        id: "bundle-002",
        name: "Inshore Barramundi & Mangrove Hunter",
        badge: "Most Popular",
        price: 11499,
        originalPrice: 14299,
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
        tagline: "Precision twitching outfit for aggressive estuary and backwater predators.",
        includes: [
          "Predator Pro 7ft Medium-Fast Carbon Rod",
          "Kraken 5000 IPX6 Salt-Sealed Reel (15kg Drag)",
          "GhostFluor 100% Fluorocarbon Leader (30lb)",
          "3 x HydroPulse & Phantom Minnow Hard Lures",
          "Titanium Saltwater Braid Pliers"
        ]
      },
      {
        id: "bundle-003",
        name: "Heavy Surfcasting Breaker Arsenal",
        badge: "Trophy Grade",
        price: 15999,
        originalPrice: 19499,
        image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=800&q=80",
        tagline: "Launch heavy pyramid sinkers 100+ meters through crashing breakers.",
        includes: [
          "Apex 12ft 40T Toray High-Modulus Surf Rod",
          "Kraken 5000 Surf Long-Cast Spinning Reel",
          "AquaShield 8X Braid (40lb) + Shock Leader",
          "AeroBullet 150g Pyramid Sinker Assortment",
          "StrikeScent Preserved Squid Strips (2-Pack)"
        ]
      },
      {
        id: "bundle-004",
        name: "Offshore Big Game & GT Popping Rig",
        badge: "Master Grade",
        price: 28999,
        originalPrice: 34999,
        image: "https://images.unsplash.com/photo-1520690214124-2405c5217036?auto=format&fit=crop&w=800&q=80",
        tagline: "Uncompromising marine artillery built to stop 30kg+ pelagic freight trains.",
        includes: [
          "Apex 40T Toray Nano-Carbon Popping Blank",
          "DeepDrop 8000 Billet Aluminum Reel (22kg Drag)",
          "400m Hollow Core 80lb Braid",
          "2 x ViperTopwater 160mm Heavy Surface Poppers",
          "GripLock 25kg Digital Fish Lip Gripper"
        ]
      }
    ],

    volumeDiscounts: [
      {
        title: "Multi-Lure Pack Savings",
        discount: "10% OFF",
        condition: "Add any 3 or more artificial lures to cart"
      },
      {
        title: "Free Express Shipping Across India",
        discount: "FREE DELIVERY",
        condition: "Automatically applied on all orders over ₹2,999"
      },
      {
        title: "Bulk Terminal Tackle Discount",
        discount: "15% OFF",
        condition: "Order 5+ packs of hooks, sinkers, or leaders"
      }
    ]
  },

  testimonials: [
    {
      name: "Rohan Varma",
      location: "Kochi, Kerala",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      role: "Inshore Lure Specialist",
      quote: "The Kraken 5000 reel paired with the Predator Pro rod completely transformed my Barramundi game. The drag startup is so buttery smooth that even when a 7kg Barra jumped right beside the boat, the line never snapped. HookPoint is the real deal for Indian anglers.",
      catchPhoto: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Captain Sameer Khan",
      location: "Goa Waters",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      role: "Offshore Charter Captain",
      quote: "We run daily pelagic charters out of North Goa. Salt spray kills ordinary reels in three months. The gear we purchased from HookPoint has endured an entire monsoon season with zero bearing grind. Their rod spooling service is also flawlessly tensioned.",
      catchPhoto: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Ananya Deshmukh",
      location: "Mumbai, Maharashtra",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      role: "Surf Casting Enthusiast",
      quote: "I was struggling to cast past the heavy Mumbai breakers until I got the Apex 12ft Surf Rod. Launched an 80g sinker easily 90 meters out! Landed my personal best Blackspotted Croaker two days later. Fast shipping and rugged PVC tube packaging.",
      catchPhoto: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=400&q=80"
    }
  ]
};

// Expose globally for vanilla JS access
if (typeof window !== "undefined") {
  window.HookPointData = HookPointData;
}

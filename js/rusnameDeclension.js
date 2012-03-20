/**
 * Простой скрипт склонения русских имен
 *
 * Usage:
 *
 * string rusNameDeclension.get("Имя" [, пол(0,_1_=f,m)[, падеж(imi,rod,_dat_,vin,pre)]]);
 * rusNameDeclension.get("Имя"); - склоняет мужское имя в дательный падеж
 *
 * @author Eugene Smith <easmith@mail.ru>
 */
var rusNameDeclension =
{
	rules :
	[
		{
			ends: "лев",
			imi	: [	"",	""	],
			rod	: [	"",	"--ва"	],
			dat	: [	"",	"--ву"	],
			vin	: [	"",	"--ву"	],
			tvo	: [	"",	"--вом"	],
			pre	: [	"",	"--ьве"	]
		},
		{
			ends: "авел",
			imi	: [	"",	""	],
			rod	: [	"ы",	"--ла"	],
			dat	: [	"у",	"--лу"	],
			vin	: [	"у",	"--ла"	],
			tvo	: [	"ой",	"--лом"	],
			pre	: [	"е",	"--ле"]
		},
		{
			ends: "й,ь",
			imi	: [	"",	""	],
			rod	: [	"",	"-я"	],
			dat	: [	"",	"-ю"	],
			vin	: [	"",	"-я"	],
			tvo	: [	"",	"-ем"	],
			pre	: [	"",	"-я"	]
		},
		{
			ends: "б,в,г,д,ж,з,к,л,м,н,п,р,с,т,ф,х,ц,ч,ш,щ",
			imi	: [	"",	""	],
			rod	: [	"",	"а"	],
			dat	: [	"",	"у"	],
			vin	: [	"",	"а"	],
			tvo	: [	"",	"ом"	],
			pre	: [	"",	"а"	]
		},
		{
			ends: "е,ё,и,о,у,ы,э,ю,уа",
			imi	: [	"",	""	],
			rod	: [	"",	""	],
			dat	: [	"",	""	],
			vin	: [	"",	""	],
			tvo	: [	"",	""	],
			pre	: [	"",	""	]
		},
		{
			ends: "я",
			imi	: [	"",	""	],
			rod	: [	"-и",	"-и"	],
			dat	: [	"-е",	"-е"	],
			vin	: [	"-ю",	"-ю"	],
			tvo	: [	"-ей",	"-ей"	],
			pre	: [	"-ю",	"-ю"	]
		}

	],

	fName : "",
	pad : "dat",
	sex : 1,

	get : function(name, sex, pad)
	{
		this.fName = name;
		this.sex = sex == "f" ? 0 : (sex == "m" ? 1: (parseInt(sex) == 0 ? 0 : 1));
		this.pad = pad == undefined ? "dat" : "pad";
		for (var i in this.rules)
		{
			var nEnds = this.rules[i].ends.split(",");
			for (var j in nEnds)
			{
				var eLen = nEnds[j].length
				if (this.fName.substr(this.fName.length - eLen, eLen).toLocaleUpperCase() == nEnds[j].toLocaleUpperCase())
				{
					var cut = this.rules[i][this.pad][this.sex].lastIndexOf("-") + 1;
					var result = this.fName.substr(0, this.fName.length - cut);
					result += this.rules[i][this.pad][this.sex].substr(cut);
					return result;
				}
			}
		}
		return this.fName;
	}
}

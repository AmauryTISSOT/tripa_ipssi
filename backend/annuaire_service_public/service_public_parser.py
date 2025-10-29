import json


class ServicePublicParser:
    """Parse les données JSON d'un service public issues de l'API Service-Public."""

    @staticmethod
    def safe_json_loads(value, default=None):
        """Tente de parser un champ JSON, renvoie `default` si erreur ou valeur vide."""
        if not value or not isinstance(value, (str, bytes)):
            return default
        try:
            return json.loads(value)
        except (json.JSONDecodeError, TypeError):
            return default

    @classmethod
    def parse_adresse(cls, record):
        adresse = ""
        latitude = ""
        longitude = ""
        addr_list = cls.safe_json_loads(record.get("adresse"), [])
        if addr_list:
            addr_info = addr_list[0]
            numero_voie = addr_info.get("numero_voie", "")
            complement1 = addr_info.get("complement1", "")
            complement2 = addr_info.get("complement2", "")
            code_postal = addr_info.get("code_postal", "")
            nom_commune = addr_info.get("nom_commune", "")
            latitude = addr_info.get("latitude", "")
            longitude = addr_info.get("longitude", "")

            adresse = f"{numero_voie} {complement1} {complement2} - {code_postal} {nom_commune}".strip(
                " -"
            )
        return adresse, latitude, longitude

    @classmethod
    def parse_horaires(cls, record):
        horaires_list = cls.safe_json_loads(record.get("plage_ouverture"), [])
        if horaires_list:
            h = horaires_list[0]
            debut1 = h.get("valeur_heure_debut_1", "")
            fin1 = h.get("valeur_heure_fin_1", "")
            return f"{debut1}-{fin1}" if debut1 and fin1 else ""
        return ""

    @classmethod
    def parse_telephone(cls, record):
        tel_list = cls.safe_json_loads(record.get("telephone"), [])
        if tel_list:
            return tel_list[0].get("valeur", "")
        return ""

    @classmethod
    def parse_type_service(cls, record):
        pivot_list = cls.safe_json_loads(record.get("pivot"), [])
        if pivot_list:
            return pivot_list[0].get("type_service_local", "")
        return ""

    @classmethod
    def parse_record(cls, record):
        adresse, latitude, longitude = cls.parse_adresse(record)
        return {
            "nom": record.get("nom", ""),
            "type": cls.parse_type_service(record),
            "adresse": adresse,
            "horaires": cls.parse_horaires(record),
            "telephone": cls.parse_telephone(record),
            "email": record.get("adresse_courriel", ""),
            "longitude": longitude,
            "latitude": latitude,
        }

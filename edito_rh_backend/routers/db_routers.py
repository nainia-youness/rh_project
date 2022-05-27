
class AuthRouter:
    route_app_labels = {'admin', 'sessions', 'users'}

    def db_for_read(self, model, **hints):
        """
        Attempts to read auth and contenttypes models go to auth_db.
        """
        if model._meta.app_label in self.route_app_labels:
            return 'users_db'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label in self.route_app_labels:
            return 'users_db'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        # allow relations btw databases
        """
        Allow relations if a model in the auth or contenttypes apps is
        involved.
        """
        if (
            obj1._meta.app_label in self.route_app_labels or
            obj2._meta.app_label in self.route_app_labels
        ):
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the auth and contenttypes apps only appear in the
        'users_db' database.
        """
        if app_label in self.route_app_labels:
            return db == 'users_db'
        return None


class MainRouter:
    route_app_labels = {'villes', 'fonctions', 'entites',
                        'directions', 'contrats', 'centres_cout', 'affectations','employes','rubriques',
                        'variables','formules','traitements'
                        }

    def db_for_read(self, model, **hints):
        if model._meta.app_label in self.route_app_labels:
            return 'main_db'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label in self.route_app_labels:
            return 'main_db'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        if (
            obj1._meta.app_label in self.route_app_labels or
            obj2._meta.app_label in self.route_app_labels
        ):
           return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label in self.route_app_labels:
            return db == 'main_db'
        return None

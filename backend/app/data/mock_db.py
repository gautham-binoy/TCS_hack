"""Backward compatibility re-export from app.db"""
from app.db.session import db, CampusDB

__all__ = ["db", "CampusDB"]

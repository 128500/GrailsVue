package myapp

import grails.gorm.services.Service

@Service(Driver)
interface DriverDataService{
    Driver save(String name)
}
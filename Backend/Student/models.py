from django.db import models
import jwt
# Create your models here.
from django.db import models
from django.conf import settings

class Teacher(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='Teacher_app_images/', null=True, blank=True)


    students = models.ManyToManyField('Student', related_name='teachers')

    def __str__(self):
        return self.name



class Student(models.Model):
    name = models.CharField(max_length=100)
    # has_certificate = models.BooleanField(default=False) 

    def __str__(self):
        return self.name
    
class Certificate(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    issue_date = models.DateField(auto_now=True)
    certificate_id = models.CharField(max_length=10, unique=True,blank=True) 
   
    jwt_token = models.CharField(max_length=500,unique=True, blank=True)

    def generate_jwt(self):
        payload = {
            'teacher_id': self.teacher.id,
            'student_id': self.student.id,
            'certificate_id': self.id,
        }
        self.jwt_token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        self.save()



